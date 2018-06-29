const Command = require('./../command');
const { prefix: getPrefix } = require('./../../servers');
const { ADMINISTRATOR } = require('./../../constants/perms');
const { update } = require('./../../servers');
const { prepare } = require('./../../helpers');

class Prefix extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Sets the command prefix for the Server.',
            params: {
                prefix: {
                    default: null,
                },
            },
            perms: {
                user: {
                    required: [ADMINISTRATOR],
                },
            },
        });
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute(config) {
        super.execute(config);

        const { msg, params, is } = config;

        if (is.dm) {
            return;
        }

        const { prefix } = params;

        if (prefix === null) {
            msg.channel.send(prepare(`Prefix for this Server: **${getPrefix(msg.guild.id)}**`));
            return;
        }

        if (!prefix.length) {
            return;
        }

        update(msg.guild.id, {
            prefix,
        });
    }

}

module.exports = new Prefix();
