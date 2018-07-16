  const Command = require('./../command');
  const { rand, prepare } = require('./../../helpers');
  const request = require('request');

  class Gain extends Command {

      /**
       * Initializes the new Command Instance.
       */
      constructor() {
          super({
              desc: 'Shows top gainers in US Markets',
              aliases: ['gain'],
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

          request('https://api.iextrading.com/1.0/stock/market/list/gainers', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            console.log(body.url);
            console.log(body.explanation);

            msg.channel.send({embed: {color: 3447003,title: "US Equity Gainers",
            fields: [{
                name: body[0].symbol,
                value: body[0].companyName + " : " + body[0].change + "% : " + body[0].latestPrice
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

  module.exports = new Gain();
