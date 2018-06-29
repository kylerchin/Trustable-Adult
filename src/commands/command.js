const merge = require('deepmerge');
const { log } = require('./../stats');

class Command {

    /**
     * Initializes the new Command Instance.
     *
     * @param {Object} config
     */
    constructor(config) {
        config = merge({
            enabled: true,
            params: {},
            desc: '',
            aliases: [],
            perms: {
                bot: {
                    required: [],
                    optional: [],
                },
                user: {
                    required: [],
                    optional: [],
                },
            },
            guildOwnerOnly: false,
        }, config);

        /**
         * Whether the command is enabled for use or not.
         *
         * @type {Boolean}
         */
        this.enabled = config.enabled;

        /**
         * Names parameters for this Command.
         *
         * @type {Array}
         */
        this.params = config.params;

        /**
         * The Help Text for this Command.
         *
         * @type {String}
         */
        this.desc = config.desc;

        /**
         * All of the aliases for the Command.
         *
         * @type {Array}
         */
        this.aliases = config.aliases;

        /**
         * All of the Permissions required to use this command.
         *
         * @type {Object}
         */
        this.perms = config.perms;

        /**
         * Whether or not this Command can only be run by the Guild Owner.
         *
         * @type {Boolean}
         */
        this.guildOwnerOnly = config.guildOwnerOnly;
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute(config) {
        const { msg, is } = config;

        // Log the Statistics.
        log('commands_executed', 'all');

        if (!is.dm) {
            log('commands_executed', msg.guild.id);
        }
    }

}

module.exports = Command;
