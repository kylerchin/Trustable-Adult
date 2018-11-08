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
const huangquotes = require('./../commands/utils/huangquotes/huangquotes');
const quote = require('./../commands/utils/quote');
const debug = require('./../commands/dev/debug');
const eval = require('./../commands/dev/eval');
const shibe = require('./../commands/utils/randImg/shibe');
const gain = require('./../commands/financials/gainers');
const lose = require('./../commands/financials/losers');
const active = require('./../commands/financials/mostactive');
const active = require('./../commands/financials/hit');

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
    quote,
    debug,
    eval,
    shibe,
    gain,
    lose,
    active,
    huangquotes,
    hit
};
