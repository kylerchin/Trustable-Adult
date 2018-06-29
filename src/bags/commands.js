const price = require('./../commands/crypto/price');
const convert = require('./../commands/crypto/convert');
const balance = require('./../commands/crypto/balance');
const top = require('./../commands/crypto/top');
const poll = require('./../commands/utils/poll');
const prefix = require('./../commands/admin/prefix');
const stats = require('./../commands/utils/stats');
const flip = require('./../commands/utils/flip');
const dice = require('./../commands/utils/dice');
const ping = require('./../commands/utils/ping');
const info = require('./../commands/utils/info');
const help = require('./../commands/utils/help');
const debug = require('./../commands/dev/debug');
const eval = require('./../commands/dev/eval');

module.exports = {
    price,
    convert,
    balance,
    top,
    poll,
    prefix,
    stats,
    flip,
    dice,
    ping,
    info,
    help,
    debug,
    eval,
};
