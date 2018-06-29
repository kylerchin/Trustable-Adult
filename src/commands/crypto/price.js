const { RichEmbed } = require('discord.js');
const { Crypto } = require('./../../bags/models');
const Command = require('./../command');
const ticker = require('./../../ticker');
const { prepare } = require('./../../helpers');

class Price extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Shows CoinMarketCap data for the given Cryptocurrency.',
            params: {
                id: {
                    required: true,
                },
            },
        });
    }

    /**
     * Executes the Command logic.
     *
     * @param {Object} config
     */
    execute(config) {
        super.execute(config);

        const { msg, params } = config;
        const from = params.id.toLowerCase();
        let currency = null;
        let sentMessage = null;

        msg.channel.send(prepare('Fetching...')).then(message => {
            sentMessage = message;
            currency = ticker.getCurrencyId(from);

            return Crypto.findById(currency);
        }).then(data => {
            if (sentMessage === null || data === null) {
                return Promise.reject();
            }

            data = data.get({
                plain: true,
            });

            const now = Date.now();
            const diff = Math.floor((now - data.checkedAt.getTime()) / 1000);
            let color = 0xCC0000; // Red.
            let diffStr = `${diff}s`;

            if (diff > 60) {
                const mins = Math.floor(diff / 60);
                diffStr = `${mins}m`;
            }

            if (data.change_1h > 0) {
                color = 0x29A329; // Green.
            }

            sentMessage.edit(new RichEmbed({
                title: `${data.name} [${data.symbol.toUpperCase()}]`,
                url: `https://coinmarketcap.com/currencies/${data.slug}`,
                color,
                footer: {
                    icon_url: `https://s2.coinmarketcap.com/static/img/coins/16x16/${data.id}.png`,
                    text: `Updated ${diffStr} ago`,
                },
                fields: [
                    {
                        name: 'Rank',
                        value: data.rank,
                        inline: true,
                    },
                    {
                        name: 'Cost (USD)',
                        value: parseFloat(data.price_usd).toLocaleString('en-US'),
                        inline: true,
                    },
                    {
                        name: 'Cost (BTC)',
                        value: `${data.price_btc}`,
                        inline: true,
                    },
                    {
                        name: 'Change (1h)',
                        value: `${data.change_1h}%`,
                        inline: true,
                    },
                    {
                        name: 'Change (24h)',
                        value: `${data.change_24h}%`,
                        inline: true,
                    },
                    {
                        name: 'Change (7d)',
                        value: `${data.change_7d}%`,
                        inline: true,
                    },
                ],
            }));
        }).catch(() => {
            const text = prepare(`Could not fetch prices for "${from}".`);

            if (sentMessage !== null) {
                sentMessage.edit(text);
            } else {
                msg.channel.send(text);
            }
        });
    }

}

module.exports = new Price();
