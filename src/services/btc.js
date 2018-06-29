const request = require('request');

const base = 'https://chain.api.btc.com/v3/';

const account = (address, tokens = false) => new Promise((resolve, reject) => {
    request(`${base}address/${address}`, (err, response, body) => {
        if (err) {
            reject();
        }

        const data = JSON.parse(body);

        if (data.err_no === 0) {
            resolve(data.data);
        }

        reject();
    });
});

module.exports = {
    account,
};
