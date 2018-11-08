const request = require('request');

const base = 'https://api.coinmarketcap.com/v2/';

const fetch = (id, conversion = 'BTC') => new Promise((resolve, reject) => {
    request(`${base}ticker/${id}?convert=${conversion.toUpperCase()}`, (err, response, body) => {
        if (err) {
            reject();
        }

        const data = JSON.parse(body);

        if (data.data === null) {
            reject(err);
        }

        resolve(data.data);
    });
});

const ticker = options => new Promise((resolve, reject) => {
    // Generate options string.
    const keys = Object.keys(options);
    const total = keys.length;
    let optionsStr = '';

    for (let o = 0; o < total; o++) {
        optionsStr += `${o ? '&' : '?'}${keys[o]}=${options[keys[o]]}`;
    }

    request(`${base}ticker${encodeURI(optionsStr)}`, (err, response, body) => {
        if (err) {
            reject();
        }

        const data = JSON.parse(body);

        if (typeof data.data === 'object') {
            resolve(data.data);
        } else {
            reject(err);
        }
    });
});

const listings = () => new Promise((resolve, reject) => {
    request(`${base}listings`, (err, response, body) => {
        if (err) {
            reject(err);
        }

        try {
            const data = JSON.parse(body);

            if (Array.isArray(data.data)) {
                resolve(data.data);
            } else {
                reject('Invalid body');
            }
        } catch (e) {
            reject(e);
        }
    });
});

module.exports = {
    fetch,
    ticker,
    listings,
};
