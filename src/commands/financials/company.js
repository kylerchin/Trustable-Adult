  const Command = require('./../command');
  const { rand, prepare } = require('./../../helpers');

  class Company extends Command {

      /**
       * Initializes the new Command Instance.
       */
      constructor() {
          super({
              desc: 'Flips a coin. That\'s all.',
              aliases: ['f'],
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

          request('https://api.iextrading.com/1.0/stock/aapl/company', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            console.log(body.url);
            console.log(body.explanation);
          });

          msg.channel.send({embed: {color: 3447003,title: "Company",
          fields: [{
              name: "Symbol",
              value: body.symbol
            },
            {
                name: "companyName",
                value: body.companyName
            },
            {
                name: "Exchange",
                value: body.exchange
            },
          ],
          footer: {
            text: "Data provided for free by IEX. View IEX’s Terms of Use."
          }
        }
      });

      }

  }

  module.exports = new Company();
