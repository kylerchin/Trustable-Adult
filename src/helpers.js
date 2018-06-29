/**
 * Generates a random integer in the given range.
 *
 * @param {Number} min
 * @param {Number} max
 *
 * @return {Number}
 */
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Prepares a message before it is sent in Discord Chat.
 * Currently only adds a blank whitespace before the message to stop other Bots
 * from catching it.
 *
 * @param {String} msg
 *
 * @return {String}
 */
const prepare = msg => `\u200B${msg}`;

module.exports = {
    rand,
    prepare,
};
