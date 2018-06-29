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

**GitHub:** https://github.com/oyed/butler
**Support:** https://discord.gg/2VBKbEH
**Vote for Butler:** https://discordbots.org/bot/395189067719114752/vote

Made by OYΞD#1337 (https://oyed.io)

---

**Donations:**

NANO: xrb_1oyed1fzw688ahrg8yy73tya5fnj7xqigttkwmdh36edk5hfknbd6uu548h8`));
    }

}

module.exports = new Info();
