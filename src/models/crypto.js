const { STRING, INTEGER, DATE, FLOAT } = require('sequelize');
const { sequelize } = require('./../client');

const Crypto = sequelize.define('cryptos', {
    id: {
        type: INTEGER,
        primaryKey: true,
    },
    name: {
        type: STRING,
    },
    symbol: {
        type: STRING,
    },
    slug: {
        type: STRING,
    },
    rank: {
        type: INTEGER,
        defaultValue: 0,
    },
    price_btc: {
        type: FLOAT,
        defaultValue: 0,
    },
    price_usd: {
        type: FLOAT,
        defaultValue: 0,
    },
    change_1h: {
        type: FLOAT,
        defaultValue: 0,
    },
    change_24h: {
        type: FLOAT,
        defaultValue: 0,
    },
    change_7d: {
        type: FLOAT,
        defaultValue: 0,
    },
    checkedAt: {
        type: DATE,
    },
});

module.exports = Crypto;
