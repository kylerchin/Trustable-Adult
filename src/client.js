const Sequelize = require('sequelize');
const Discord = require('discord.js');
const Dbl = require('dblapi.js');

// Discord.
const discord = new Discord.Client({
    disableEveryone: true,
    disabledEvents: [
        'GUILD_ROLE_CREATE',
        'GUILD_ROLE_DELETE',
        'GUILD_ROLE_UPDATE',
        'GUILD_BAN_ADD',
        'GUILD_BAN_REMOVE',
        'CHANNEL_CREATE',
        'CHANNEL_DELETE',
        'CHANNEL_UPDATE',
        'CHANNEL_PINS_UPDATE',
        'USER_UPDATE',
        'USER_NOTE_UPDATE',
        'USER_SETTINGS_UPDATE',
        'VOICE_STATE_UPDATE',
        'TYPING_START',
        'VOICE_SERVER_UPDATE',
    ],
});
const login = () => {
    console.log('Authenticating with Discord...');

    return new Promise((resolve, reject) => {
        discord.login(process.env.DISCORD_TOKEN);
        discord.once('ready', () => resolve());
    });
};

// Discord Bot List.
let dbl = null;

if (process.env.DISCORDBOTS_TOKEN.length) {
    dbl = new Dbl(process.env.DISCORDBOTS_TOKEN, discord);
}

// PostgreSQL.
const {
    POSTGRESQL_PORT,
    POSTGRESQL_HOST,
    POSTGRESQL_USER,
    POSTGRESQL_PASSWORD,
    POSTGRESQL_DB,
} = process.env;

const sequelize = new Sequelize(POSTGRESQL_DB, POSTGRESQL_USER, POSTGRESQL_PASSWORD, {
    host: POSTGRESQL_HOST,
    port: POSTGRESQL_PORT,
    dialect: 'postgres',
    logging: false,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

module.exports = {
    discord,
    login,
    dbl,
    sequelize,
};
