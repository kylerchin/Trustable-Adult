const Command = require('./../command');
const { rand, prepare } = require('./../../helpers');
const request = require('request');
const cheerio = require('cheerio');

  class Hit extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Show Economic Calendar',
            aliases: ['cal'],
        });
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute(config) {
        super.execute(config);

        const { msg, params } = config;
        const { sector } = params;

        const cheerio = require('cheerio');
        const request = require('request');

  }
}

module.exports = new Hit();
