const { RichEmbed } = require('discord.js');
const Command = require('./../command');
const { discord } = require('./../../client');

class Debug extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            enabled: false,
            desc: 'Prints Butler debug info.',
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
        const fields = [
            {
                name: 'Total Servers',
                value: `${discord.guilds.array().length}`,
                inline: true,
            },
            {
                name: 'Average Ping',
                value: `${discord.ping}`,
                inline: true,
            },
        ];

        msg.channel.send(new RichEmbed({
            title: 'Butler Debug',
            color: 0xCC0000,
            fields,
        }));
    }

}

module.exports = new Debug();
