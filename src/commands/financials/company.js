  import IEXClient from 'iex-api'
  import * as _fetch from 'isomorphic-fetch';

  const Command = require('./../command');
  const { rand, prepare } = require('./../../helpers');

  class Flip extends Command {

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

          msg.channel.send(prepare(text));

          const iex = new IEXClient(_fetch)
          iex.stockCompany('AAPL').then(company => console.log(company))

          msg.channel.send({embed: {color: 3447003,title: "Company",
          fields: [{
              name: "Symbol",
              value: company.symbol
            },
            {
                name: "companyName",
                value: company.companyName
            },
            {
                name: "Exchange",
                value: company.exchange
            },
          ],
          footer: {
            text: "Data provided for free by IEX. View IEX’s Terms of Use."
          }
        }
      });

      }

  }

  module.exports = new Flip();
