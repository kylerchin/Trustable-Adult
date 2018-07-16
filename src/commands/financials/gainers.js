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

          //Requesting through IEXTrading API
          request('https://api.iextrading.com/1.0/stock/market/list/gainers', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            console.log(body.url);
            console.log(body.explanation);

            //input the number of what number of the list, then output the desired string
            function getValue(numList) {
              return body[numList].companyName + " : " + body[numList].change + "% $" + body[numList].latestPrice;
            }

            msg.channel.send({embed: {color: 1687175,title: "US Equity Gainers",
            fields: [{
                name: body[0].symbol,
                value: getValue(0),
                  "inline": true
              },
              {
                  name: body[1].symbol,
                  value: getValue(1),
                  "inline": true
              },
              {
                  name: body[2].symbol,
                  value: getValue(2),
                  "inline": true
              },
              {
                  name: body[3].symbol,
                  value: getValue(3),
                  "inline": true
              },
              {
                  name: body[4].symbol,
                  value: getValue(4),
                  "inline": true
              },
              {
                  name: body[5].symbol,
                  value: getValue(5),
                  "inline": true
              },
              {
                  name: body[6].symbol,
                  value: getValue(6),
                  "inline": true
              },
              {
                  name: body[7].symbol,
                  value: getValue(7),
                  "inline": true
              },
              {
                  name: body[8].symbol,
                  value: getValue(8),
                  "inline": true
              },
              {
                  name: body[9].symbol,
                  value: getValue(9),
                  "inline": true
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
