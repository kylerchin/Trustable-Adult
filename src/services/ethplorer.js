const request = require('request');

const base = 'https://api.ethplorer.io/';
const key = process.env.ETHPLORER_TOKEN;

const account = (address, tokens = false) => new Promise((resolve, reject) => {
    request(`${base}getAddressInfo/${address}?apiKey=${key}`, (err, response, body) => {
        if (err) {
            reject();
        }

        const data = JSON.parse(body);

        resolve(data);
    });
});

module.exports = {
    account,
};
