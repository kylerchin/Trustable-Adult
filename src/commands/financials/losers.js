const Command = require('./../command');
const { rand, prepare } = require('./../../helpers');
const request = require('request');

class Lose extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Shows top losers in US Markets',
            aliases: ['loser','losers'],
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

        //Requesting through IEXTrading API
        request('https://api.iextrading.com/1.0/stock/market/list/gainers', { json: true }, (err, res, body) => {
          if (err) { return console.log(err); }
          console.log(body.url);
          console.log(body.explanation);

          //input the number of what number of the list, then output the desired string
          function getValue(numList) {
            return body[numList].companyName + " : " + body[numList].change + "% $" + body[numList].latestPrice;
          }

          msg.channel.send({embed: {color: 16195873,title: "US Equity Losers",
          fields: [{
              name: body[0].symbol,
              value: getValue(0)
            },
            {
                name: body[1].symbol,
                value: getValue(1)
            },
            {
                name: body[2].symbol,
                value: getValue(2)
            },
            {
                name: body[3].symbol,
                value: getValue(3)
            },
            {
                name: body[4].symbol,
                value: getValue(4)
            },
            {
                name: body[5].symbol,
                value: getValue(5)
            },
            {
                name: body[6].symbol,
                value: getValue(6)
            },
            {
                name: body[7].symbol,
                value: getValue(7)
            },
            {
                name: body[8].symbol,
                value: getValue(8)
            },
            {
                name: body[9].symbol,
                value: getValue(9)
            }
          ],
          footer: {
            text: "Data provided for free by IEX. View IEX’s Terms of Use."
          }
        }
      });
        });

    }

}

module.exports = new Lose();
