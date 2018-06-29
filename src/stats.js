const now = require('performance-now');
const { Stat } = require('./bags/models');

let toSave = {};

const log = (type, server, val = 1) => {
    if (!toSave[type]) {
        toSave[type] = {};
    }

    if (typeof toSave[type][server] !== 'number') {
        toSave[type][server] = 0;
    }

    toSave[type][server] += val;
};

const save = () => {
    const types = Object.keys(toSave);
    const totalTypes = types.length;
    const queries = [];
    const start = now();

    if (!totalTypes) {
        return;
    }

    console.log('Saving collected Statistics...');

    for (let t = 0; t < totalTypes; t++) {
        const servers = Object.keys(toSave[types[t]]);
        const totalServers = servers.length;

        for (let s = 0; s < totalServers; s++) {
            const count = toSave[types[t]][servers[s]];

            queries.push(Stat.findOne({
                where: {
                    type: types[t],
                    server: servers[s],
                },
            }).then(instance => {
                let val = count;
                let op = null;

                if (instance !== null) {
                    instance = instance.get({
                        plain: true,
                    });
                    val += instance.value;

                    op = Stat.update({
                        value: val,
                    }, {
                        where: {
                            type: types[t],
                            server: servers[s],
                        },
                    });
                } else {
                    op = Stat.create({
                        type: types[t],
                        server: servers[s],
                        value: val,
                    });
                }

                return op;
            }));
        }
    }

    toSave = {};

    return Promise.all(queries).then(() => {
        const diff = ((now() - start) / 1000).toFixed(2);
        console.log(`Saved Statistics in ${diff}s`);
    });
};

module.exports = {
    log,
    save,
};
