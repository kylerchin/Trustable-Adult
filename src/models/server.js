const { STRING } = require('sequelize');
const { sequelize } = require('./../client');

const Server = sequelize.define('servers', {
    id: {
        type: STRING,
        primaryKey: true,
    },
    name: {
        type: STRING,
    },
    prefix: {
        type: STRING,
        defaultValue: process.env.COMMAND_PREFIX,
    },
});

module.exports = Server;
