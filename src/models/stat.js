const { STRING, INTEGER } = require('sequelize');
const { sequelize } = require('./../client');

const Stat = sequelize.define('stats', {
    type: {
        type: STRING,
    },
    server: {
        type: STRING,
    },
    value: {
        type: INTEGER,
        defaultValue: 0,
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['type', 'server'],
        },
    ],
});

Stat.removeAttribute('id');

module.exports = Stat;
