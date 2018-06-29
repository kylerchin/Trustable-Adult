const now = require('performance-now');
const { Server } = require('./bags/models');

const servers = {};

const fetch = () => {
    const start = now();

    console.log('Fetching all Server config...');

    return Server.findAll().then(results => {
        const total = results.length;

        for (let s = 0; s < total; s++) {
            const server = results[s].get({
                plain: true,
            });

            servers[server.id] = server;
        }

        const diff = ((now() - start) / 1000).toFixed(2);
        console.log(`Fetched ${total} Servers in ${diff}s`);
    });
};

const update = (id, data) => {
    servers[id] = Object.assign(servers[id], data);

    return Server.update(data, {
        where: {
            id,
        },
    });
};

const joined = guild => {
    servers[guild.id] = null;

    Server.insertOrUpdate({
        id: guild.id,
        name: guild.name,
    }).then(() => {
        return Server.findById(guild.id);
    }).then(server => {
        servers[guild.id] = server.get({
            plain: true,
        });
    });
};

const left = guild => {
    Server.destroy({
        id: guild.id,
    });
};

const prefix = id => {
    let prefix = process.env.COMMAND_PREFIX;

    if (id !== null) {
        const data = servers[id];

        if (data) {
            prefix = data.prefix;
        }
    }

    return prefix.replace(new RegExp('\\[space\\]', 'g'), ' ');
};

module.exports = {
    servers,
    fetch,
    update,
    joined,
    left,
    prefix,
};
