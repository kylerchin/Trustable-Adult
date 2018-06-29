const { RichEmbed } = require('discord.js');
const Command = require('./../command');
const { discord } = require('./../../client');
const { prepare } = require('./../../helpers');
const { log } = require('./../../stats');

class Poll extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Creates a Poll with the given options on extra lines.',
            params: {
                question: {
                    required: true,
                    full: true,
                },
            },
        });

        /**
         * The alphabet. That's all.
         *
         * @type {String}
         */
        this.alpha = 'abcdefghijklmnopqrstuvwxyz';
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute(config) {
        super.execute(config);

        const { msg, params, is } = config;
        const { question } = params;
        const answers = [];
        const used = [];
        let { lines } = config;
        let totalAnswers = lines.length;
        let printDesc = true;

        if (totalAnswers > 10) {
            msg.channel.send(prepare('Polls can only have 10 options.'));
            return;
        } else if (totalAnswers === 0) {
            printDesc = false;
            lines = [
                '👍',
                '👎',
            ];
            totalAnswers = 2;
        }

        for (let a = 0; a < totalAnswers; a++) {
            const answer = lines[a];

            if (!answer.length) {
                continue;
            }

            const split = answer.split(' ');
            const hasText = split[0].charAt(split[0].length - 1) === ')';
            const hasEmoji = answer.codePointAt(0) > 255;
            const isCustomEmoji = split[0].charAt(0) === '<' && split[0].charAt(split[0].length - (hasText ? 2 : 1)) === '>';
            const id = this.alpha.charAt(a);
            let selector = null;
            let text = answer;

            if (hasEmoji || isCustomEmoji) {
                if (isCustomEmoji) {
                    const eSplit = split[0].split(':');

                    if (eSplit.length === 3) {
                        const emojiId = eSplit[2].slice(0, -(hasText ? 2 : 1));

                        selector = discord.emojis.find('id', emojiId);
                    }
                } else if (hasText) {
                    selector = split[0].slice(0, -1);
                } else {
                    selector = answer;
                }

                if (hasText) {
                    text = text.slice(selector.length + 2);
                } else {
                    text = null;
                }
            } else {
                selector = String.fromCodePoint(127462 + a);
            }

            // Couldn't find the Emoji.
            if (selector === null) {
                msg.channel.send(prepare(`Couldn't find the custom emoji \`${split[0]}\`, sorry!`));
                return;
            }

            if (used.indexOf(selector) !== -1) {
                msg.channel.send(prepare(`You can't use the same emoji more than once (${selector})`));
                return;
            }

            used.push(selector);

            answers.push({
                id,
                selector,
                text,
            });
        }

        let answerText = `
\u200B
`;

        for (let a = 0; a < totalAnswers; a++) {
            const answer = answers[a];
            let text = '';

            if (answer.text !== null) {
                text = ` - ${answer.text}`;
            }

            answerText += `${answer.selector}${text}
`;
        }

        answerText += '\u200B';

        if (!printDesc) {
            answerText = '';
        }

        msg.channel.send(new RichEmbed({
            title: question,
            color: 0x42A5F5,
            description: answerText,
            footer: {
                icon_url: msg.author.displayAvatarURL,
                text: `Started by ${msg.author.username}#${msg.author.discriminator}`,
            },
        })).then(message => {
            const reactions = [];

            for (let a = 0; a < totalAnswers; a++) {
                const answer = answers[a];
                reactions.push(() => message.react(answer.selector));
            }

            return reactions.reduce((p, fn) => p.then(fn), Promise.resolve());
        }).then(() => {
            log('polls', 'all');

            if (!is.dm) {
                log('polls', msg.guild.id);
            }
        });
    }

}

module.exports = new Poll();
