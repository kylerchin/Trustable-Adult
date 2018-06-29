const { RichEmbed } = require('discord.js');
const Command = require('./../command');
const Btc = require('./../../services/btc');
const Ethplorer = require('./../../services/ethplorer');
const { prepare } = require('./../../helpers');

class Balance extends Command {

    /**
     * Initializes the new Command Instance.
     */
    constructor() {
        super({
            desc: 'Returns the balance of the given Wallet.',
            params: {
                ticker: {
                    required: true,
                    range: ['btc', 'eth', 'tokens'],
                },
                address: {
                    required: true,
                },
            },
            aliases: ['bal'],
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
        const { address } = params;
        const ticker = params.ticker.toLowerCase();
        let sentMessage = null;

        msg.channel.send(prepare('Checking...')).then(message => {
            sentMessage = message;

            switch (ticker) {
                case 'btc': {
                    return Btc.account(address);
                }
                case 'tokens':
                case 'eth': {
                    return Ethplorer.account(address);
                }
            }

            return Promise.reject();
        }).then(data => {
            switch (ticker) {
                case 'btc': {
                    return {
                        name: 'Bitcoin [BTC]',
                        link: `https://btc.com/${address}`,
                        fields: [
                            {
                                name: 'Balance',
                                value: (data.balance / 100000000).toString(),
                                inline: true,
                            },
                            {
                                name: 'Total In',
                                value: (data.received / 100000000).toString(),
                                inline: true,
                            },
                            {
                                name: 'Total Out',
                                value: (data.sent / 100000000).toString(),
                                inline: true,
                            },
                        ],
                    };
                }
                case 'eth': {
                    return {
                        name: 'Ethereum [ETH]',
                        link: `https://etherscan.io/address/${address}`,
                        fields: [
                            {
                                name: 'Balance',
                                value: data.ETH.balance.toString(),
                                inline: true,
                            },
                            {
                                name: 'Total In',
                                value: data.ETH.totalIn.toString(),
                                inline: true,
                            },
                            {
                                name: 'Total Out',
                                value: data.ETH.totalOut.toString(),
                                inline: true,
                            },
                        ],
                    };
                }
                case 'tokens': {
                    const raw = data.tokens;
                    const total = raw.length;
                    const tokens = [];

                    for (let t = 0; t < total; t++) {
                        tokens.push({
                            name: raw[t].tokenInfo.name,
                            value: `${raw[t].balance / Math.pow(10, parseInt(raw[t].tokenInfo.decimals))}`,
                            inline: true,
                        });
                    }

                    return {
                        name: 'ERC-20 Tokens',
                        link: `https://etherscan.io/address/${address}`,
                        fields: tokens,
                    };
                }
            }

            return Promise.reject();
        }).then(data => {
            if (sentMessage === null) {
                return Promise.reject();
            }

            sentMessage.edit(new RichEmbed({
                title: data.name,
                url: data.link,
                fields: data.fields,
            }));
        }).catch(msg => {
            const text = prepare(msg ? msg : `Could not fetch balance for "${ticker}@${address}".`);

            if (sentMessage !== null) {
                sentMessage.edit(text);
            } else {
                msg.channel.send(text);
            }
        });
    }

}

module.exports = new Balance();
