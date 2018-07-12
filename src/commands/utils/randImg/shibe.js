//http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true

const Command = require('./../command');
const { rand, prepare } = require('./../../helpers');
var request = require("request");

class Shibe extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Output a random shibe!',
            aliases: [''],
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

        request({uri: "http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true"},
            function(error, response, body) {
              console.log(response);
              console.log(body);
              msg.channel.send({embed: {color: 3447003,title: "Shibe",
              fields: [{
                  name: "Here is a random Shibe!",
                  value: body[0]
                },
              ],
              footer: {
                text: "Powered by https://shibe.online/"
              }
            }
          });
          });
        });

}
    }

module.exports = new Shibe();
