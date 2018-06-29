const { discord } = require('./client');
const { joined, left } = require('./servers');
const parse = require('./parser');

const register = () => {
    const jobs = [];

    discord.on('message', msg => parse(msg));
    discord.on('guildCreate', guild => joined(guild));
    discord.on('guildDelete', guild => left(guild));

    // Update the Database with any Guilds we're already in.
    const guilds = discord.guilds.array();
    const total = guilds.length;

    for (let i = 0; i < total; i++) {
        jobs.push(joined(guilds[i]));
    }

    return Promise.all(jobs);
};

module.exports = {
    register,
};
