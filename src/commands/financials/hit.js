const Command = require('./../command');
const { rand, prepare } = require('./../../helpers');
const request = require('request');
var hitlist = require('./../../../modules/financials/hitlist.json');
var cheerio = require("cheerio");

class Hit extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Show brief info about top global tickers and indices Optional arguments: [futures,crypto,americas,asia,europe,commodities]',
            aliases: ['hit'],
            params: {
                market: {
                    default: null,
                }
        });
    }

    function getTicker(tradingViewTicker) {
      request({
        uri: "https://www.tradingview.com/symbols/" + tradingViewTicker,
      }, function(error, response, body) {
        console.log(body);
        var cheerioTradingView = cheerio.load(body);
      });
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute(config) {
        super.execute(config);

        const { msg, hitInput2, hitInput3 } = config;

        console.log(JSON.stringify(hitInput2));
        console.log(JSON.stringify(hitInput3));
        msg.channel.send("hit executed");

        if (params.market !== null) {

        } else {
        }
    }

}

module.exports = new Hit();
