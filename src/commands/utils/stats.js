const { RichEmbed } = require('discord.js');
const { Stat } = require('./../../bags/models');
const Command = require('./../command');
const { prepare } = require('./../../helpers');

class Stats extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Statistics about the current Server.',
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

        if (msg.guild === null) {
            return;
        }

        let sentMessage = null;

        msg.channel.send(prepare('Fetching...')).then(message => {
            sentMessage = message;

            return Stat.findAll({
                where: {
                    server: msg.guild.id,
                },
            });
        }).then(data => {
            if (sentMessage === null || !data.length) {
                return Promise.reject();
            }

            const fields = [];
            const total = data.length;

            for (let f = 0; f < total; f++) {
                const instance = data[f].get({
                    plain: true,
                });

                switch (instance.type) {
                    case 'commands_executed': {
                        fields.push({
                            name: 'Total Commands',
                            value: instance.value,
                            inline: true,
                        },
                        {
                            name: 'Total Servers Serving',
                            value: bot.servers.length,
                            inline: true,
                        },
                        {
                            name: 'Total Users Serving',
                            value: bot.users.length,
                            inline: true,
                        },
                        {
                            name: 'Total Channels Serving',
                            value: bot.channels.length,
                            inline: true,
                        }
                      );
                        break;
                    }
                }
            }

            sentMessage.edit(new RichEmbed({
                title: `Statistics for "${msg.guild.name}"`,
                fields,
            }));
        }).catch(() => {
            const text = prepare('Could not fetch stats for this Server.');

            if (sentMessage !== null) {
                sentMessage.edit(text);
            } else {
                msg.channel.send(text);
            }
        });
    }

}

module.exports = new Stats();
