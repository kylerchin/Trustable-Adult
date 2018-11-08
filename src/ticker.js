const now = require('performance-now');
const { listings, ticker } = require('./services/cmc');
const { discord } = require('./client');
const Crypto = require('./models/crypto');

class Ticker {

    /**
     * Initialize the new Ticker store.
     */
    constructor() {
        /**
         * Whether or not we're already fetching data from CMC.
         *
         * @type {Boolean}
         */
        this.fetching = false;

        /**
         * Whether or not we're already updating our Database with info from CMC.
         *
         * @type {Boolean}
         */
        this.updating = false;

        /**
         * All of the Gainers/Losers in the current period.
         *
         * @type {Object}
         */
        this.charts = {
            lastUpdated: null,
            gainers: {
                '1h': [],
                '24h': [],
                '7d': [],
            },
            losers: {
                '1h': [],
                '24h': [],
                '7d': [],
            },
        };

        /**
         * Map of CMC IDs by Symbol.
         *
         * @type {Object}
         */
        this.bySymbol = {};

        /**
         * Map of CMC IDs by Slug.
         *
         * @type {Object}
         */
        this.bySlug = {};
    }

    /**
     * Fetches price info from CMC for all Cryptos in the Database.
     *
     * @return {Promise}
     */
    update() {
        if (this.updating) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const startTime = now();

            console.log('Updating Price Information...');

            this.updating = true;

            const updates = [];
            const sort = [];
            const max = 100; // Shouldn't have over 100 pages (10,000 Cryptos) for a few years, best to use it as a limit.
            let pages = 1;
            let count = 0;

            const fetch = (start = 1) => {
                ticker({
                    start,
                    limit: 100,
                    sort: 'id',
                    convert: 'BTC',
                }).then(page => {
                    if (page === undefined || page === null) {
                        this.updating = false;
                        return;
                    }

                    const ids = Object.keys(page);
                    const total = ids.length;
                    count += total;

                    for (let c = 0; c < total; c++) {
                        const data = page[ids[c]];
                        const isBtc = data.id === 1;
                        const quote = data.quotes[isBtc ? 'USD' : 'BTC'];

                        // Add the Crypto to the Charts Sort queue.
                        sort.push([
                            ids[c],
                            quote.percent_change_1h,
                            quote.percent_change_24h,
                            quote.percent_change_7d,
                        ]);

                        updates.push(Crypto.update({
                            rank: data.rank,
                            price_btc: isBtc ? 1 : quote.price,
                            price_usd: data.quotes.USD.price,
                            change_1h: quote.percent_change_1h,
                            change_24h: quote.percent_change_24h,
                            change_7d: quote.percent_change_7d,
                            checkedAt: new Date(),
                        }, {
                            where: {
                                id: data.id,
                            },
                        }).catch(() => {
                            console.log(`"${data.name}" was not found in the DB - it will be added once Butler next updates.`);
                        }));
                    }

                    if (total >= 100) {
                        pages++;

                        if (pages >= max) {
                            reject();
                        } else {
                            fetch(start + 100);
                        }
                    } else {
                        this.sortCharts(sort);

                        Promise.all(updates).then(() => {
                            const diff = ((now() - startTime) / 1000).toFixed(2);
                            console.log(`Fetched ${count} (${pages} pages) in ${diff}s`);
                            this.updating = false;
                            resolve();
                        });
                    }
                });
            };

            fetch();
        });
    }

    /**
     * Fetches and parses the data from CoinMarketCap.
     *
     * @return {Promise}
     */
    fetch() {
        if (this.fetching) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const startTime = now();

            console.log('Updating Crypto Database...');

            this.fetching = true;

            const upserts = [];
            let totalCryptos = 0;
            let newlyCreated = 0;

            listings().then(data => {
                const total = data.length;

                for (let c = 0; c < total; c++) {
                    const config = {
                        id: data[c].id,
                        name: data[c].name,
                        symbol: data[c].symbol.toLowerCase(),
                        slug: data[c].website_slug,
                    };

                    upserts.push(Crypto.insertOrUpdate(config).then(created => {
                        this.bySymbol[config.symbol] = config.id;
                        this.bySlug[config.slug] = config.id;

                        if (created) {
                            newlyCreated++;
                        }

                        totalCryptos++;
                    }));
                }

                Promise.all(upserts).then(() => {
                    this.fetching = false;
                    const diff = ((now() - startTime) / 1000).toFixed(2);
                    console.log(`Fetched ${totalCryptos} (${newlyCreated} new) in ${diff}s`);

                    if (discord.user !== null) {
                        discord.user.setActivity(`${totalCryptos} Cryptocurrencies`, {
                            type: 'WATCHING',
                        }).then(() => resolve());
                        return;
                    }

                    resolve();
                });
            });
        });
    }

    /**
     * Sorts the Charts for Gainers/Losers.
     *
     * @param {Array} data
     */
    sortCharts(data) {
        const charts = {
            lastUpdated: Date.now(),
        };
        const types = ['gainers', 'losers'];
        const periods = ['1h', '24h', '7d'];
        const totalTypes = types.length;
        const totalPeriods = periods.length;

        // Duplicate the data for each type/period.
        // TODO: Maybe look in to optimising this?
        for (let t = 0; t < totalTypes; t++) {
            charts[types[t]] = {};

            for (let p = 1; p <= totalPeriods; p++) {
                let sorted = data.slice(0);
                sorted.sort((a, b) => t ? a[p] - b[p] : b[p] - a[p]);
                sorted = sorted.slice(0, 10);
                charts[types[t]][periods[p - 1]] = sorted.map(item => parseInt(item[0]));
            }
        }

        this.charts = charts;
    }

    /**
     * Returns a Currency ID by Slug or Symbol.
     *
     * @param {String|Number} id
     *
     * @return {Object|null}
     */
    getCurrencyId(id) {
        const isSym = !!this.bySymbol[id];

        if (isSym) {
            return this.bySymbol[id];
        }

        const isSlug = !!this.bySlug[id];

        if (isSlug) {
            return this.bySlug[id];
        }

        return id;
    }

}

module.exports = new Ticker();
