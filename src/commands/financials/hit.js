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
            desc: 'Show top market indexes currently',
            aliases: ['hit','HIT'],
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

        //Requesting through IEXTrading API
        request('https://bloomberg.com', (err, res, body) => {
          if (err) { return console.log(err); }
          console.log(body.url);
          console.log(body.explanation);
          console.log(body);

          console.log(sector);
    });
  }
}

module.exports = new Hit();
