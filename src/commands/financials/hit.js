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

    function requestSite(symbolTicker) {

    //Combine function symbolTicker to get full url to pull
      var fullViewUrl = 'https://www.tradingview.com/symbols/' + symbolTicker;

      //get content from the url
      request(fullViewUrl, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body.url);
        console.log(body.explanation);
        console.log(body);
        return body;
    });}

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
