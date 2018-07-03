const Command = require('./../command');
const { rand, prepare } = require('./../../helpers');
var unirest = require('unirest');

class Quote extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Output a random quote!',
            aliases: ['q'],
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

        unirest.get("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous").header("X-Mashape-Key", "gY8GQOVzJbmsh0SGQNT0yJoV2MLEp1ssXFLjsnFY9xdzBsenNr").header("Accept", "application/json").end(function (result) {
          console.log(result.status, result.headers, result.body);
          //msg.channel.send(result.body[0]["quote"] + ' - ' + result.body[0]["author"]);
          //nice and pretty quote
          msg.channel.send({embed: {color: 3447003,title: "Quote",
          fields: [{
              name: "Quote:",
              value: result.body[0]["quote"]
            },
          ],
          footer: {
            text: result.body[0]["author"]
          }
        }
      });
        })}
    }

module.exports = new Quote();
