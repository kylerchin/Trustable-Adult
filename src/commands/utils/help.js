const { RichEmbed } = require('discord.js');
const Command = require('./../command');
const { prefix: getPrefix } = require('./../../servers');
const { prepare } = require('./../../helpers');

class Help extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Shows all available Commands.',
            params: {
                command: {
                    default: null,
                },
            },
            aliases: ['h'],
        });
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute(config) {
        super.execute(config);

        const { msg, commands, params } = config;
        const prefix = getPrefix(msg.guild !== null ? msg.guild.id : null);
        const keys = Object.keys(commands);
        const total = keys.length;

        if (params.command !== null) {
            const cmdStr = params.command.toLowerCase();

            if (keys.indexOf(cmdStr) !== -1 || !commands[cmdStr].enabled) {
                const cmd = commands[cmdStr];
                const { perms, params } = cmd;
                const paramKeys = Object.keys(params);
                const totalParams = paramKeys.length;
                const fields = [];
                let desc = cmd.desc;
                let paramsStr = '';

                // Usage.
                for (let p = 0; p < totalParams; p++) {
                    const param = params[paramKeys[p]];
                    let range = `[${paramKeys[p]}]`;

                    if (param.range) {
                        range = param.range.join('/');
                    }

                    paramsStr += ` ${range}`;
                }

                fields.push({
                    name: 'Usage',
                    value: `\`${prefix}${cmdStr}${paramsStr}\``,
                });

                // Aliases.
                if (cmd.aliases.length) {
                    fields.push({
                        name: 'Aliases',
                        value: `\`${cmd.aliases.join(', ')}\``,
                    });
                }

                // Guild Owner only.
                if (cmd.guildOwnerOnly) {
                    desc += ' **Only usable by Guild Owner.**';
                }

                // Bot Permissions.
                if (perms.bot.required.length) {
                    fields.push({
                        name: 'Required Permissions (Bot)',
                        value: perms.bot.required.join(', '),
                    });
                }

                if (perms.bot.optional.length) {
                    fields.push({
                        name: 'Optional Permissions (Bot)',
                        value: perms.bot.optional.join(', '),
                    });
                }

                // User Permissions.
                if (perms.user.required.length) {
                    fields.push({
                        name: 'Required Permissions (User)',
                        value: perms.user.required.join(', '),
                    });
                }

                if (perms.user.optional.length) {
                    fields.push({
                        name: 'Optional Permissions (User)',
                        value: perms.user.optional.join(', '),
                    });
                }

                msg.channel.send(new RichEmbed({
                    title: `Command "${cmdStr}"`,
                    color: 0x42A5F5,
                    fields,
                    description: desc,
                }));
            } else {
                msg.channel.send(prepare(`Command \`${cmdStr}\` doesn't exist!`));
            }
        } else {
            const fields = [];

            for (let c = 0; c < total; c++) {
                const cmd = commands[keys[c]];

                if (!cmd.enabled) {
                    continue;
                }

                fields.push({
                    name: keys[c],
                    value: cmd.desc,
                });
            }

            msg.channel.send(new RichEmbed({
                title: 'Butler Command Help',
                color: 0x42A5F5,
                fields,
                footer: {
                    text: `Type "${prefix}help [command]" for more information.`,
                },
            }));
        }
    }

}

module.exports = new Help();
