const Command = require('./../command');
const { prepare } = require('./../../helpers');

class Info extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Prints general information on the Bot and where to find Support.',
            aliases: ['i'],
        });
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute(config) {
        super.execute(config);

        const { msg } = config;

        msg.channel.send(prepare(`A general purpose, open-source Cryptocurrency Discord Bot.

**GitHub:** https://github.com/kylerchin/chloe
**Our Server:** https://discord.gg/We9QexK

Made by Kyler Chin https://kylerchin.com at Logic0x LLC. https://logic0x.com`));
    }

}

module.exports = new Info();
