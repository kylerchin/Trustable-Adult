const Command = require('./../command');
const { rand, prepare } = require('./../../helpers');
const request = require('request');

class Hit extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Show brief info about top global tickers and indices',
            aliases: ['hit'],
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

        msg.channel.send("Hit command executed");
    }

}

module.exports = new Hit();
