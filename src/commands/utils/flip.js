const Command = require('./../command');
const { rand, prepare } = require('./../../helpers');

class Flip extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Flips a coin. That\'s all.',
            aliases: ['f','flip a coin','flip coin'],
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

        let text = 'You got heads!';

        if (rand(0, 1) === 1) {
            text = 'You got tails!';
        }

        msg.channel.send(prepare(text));
    }

}

module.exports = new Flip();
