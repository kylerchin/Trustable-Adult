const Command = require('./../../command');
const { rand, prepare } = require('./../../../helpers');
const quotes = require('./../../../../modules/huangquoteslist.js');

class HuangQuotes extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Gives you a quote from Mr. Huang',
            aliases: ['huang quotes'],
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

        let text = 'Insert Huang Quote';

        text = quotes[Math.floor(Math.random() * quotes.length)] + " - Mr. Huang";

        console.log(text);

        msg.channel.send(prepare(text));
    }

}

module.exports = new HuangQuotes();
