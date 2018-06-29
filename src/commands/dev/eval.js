/* eslint no-unused-vars: 0 */
const { RichEmbed } = require('discord.js');
const Command = require('./../command');

// Imports purely to expose for eval.
const { discord } = require('./../../client');

class Eval extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            enabled: false,
            desc: 'Runs arbitrary JS code via the Bot.',
        });
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute(config) {
        super.execute(config);

        const { msg, lines } = config;
        const code = lines.join(' ');
        const logs = [];
        let isError = false;
        let response = '';

        // Utility functions.
        const log = msg => logs.push(msg);

        // Parse the Code.
        const parsedCode = code.replace(new RegExp('console.log', 'g'), 'log');

        // Execute the Code.
        try {
            let result = require('util').inspect(eval(parsedCode));

            if (result === 'undefined') {
                result = 'EMPTY';
            }

            response = result;
        } catch (err) {
            isError = true;
            response = err;
        }

        let description = `Input:
\`\`\`js
${lines.join('\n')}
\`\`\`
Response:
\`\`\`js
${response}
\`\`\``;

        if (logs.length) {
            description += `
Logs:
\`\`\`
${logs.join('\n')}
\`\`\``;
        }

        msg.channel.send(new RichEmbed({
            color: isError ? 0xCC0000 : 0x29A329,
            description,
            footer: {
                icon_url: msg.author.displayAvatarURL,
                text: `Ran by ${msg.author.username}#${msg.author.discriminator}`,
            },
        }))
    }

}

module.exports = new Eval();
