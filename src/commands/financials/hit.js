const Command = require('./../command');
const { rand, prepare } = require('./../../helpers');
const request = require('request');

class Hit extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Show brief info about top global tickers',
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

        const { msg } = config;

        const request = require('request');

        console.log("Hit command executed.")
    }

}

module.exports = new Hit();
