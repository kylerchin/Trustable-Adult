const Command = require('./../command');
const { rand, prepare } = require('./../../helpers');

class Dice extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Rolls a 6-sided dice.',
            aliases: ['d','roll'],
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

        msg.channel.send(prepare("You got a " + rand(1, 6)));
    }

}

module.exports = new Dice();
