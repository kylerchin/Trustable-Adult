module.exports = {
    up: (queryInterface, { STRING, INTEGER, DATE, FLOAT }) => {
        return queryInterface.createTable('cryptos', {
            id: {
                type: INTEGER,
                primaryKey: true,
            },
            name: {
                type: STRING,
            },
            symbol: {
                type: STRING,
            },
            slug: {
                type: STRING,
            },
            rank: {
                type: INTEGER,
                defaultValue: 0,
            },
            price_btc: {
                type: FLOAT,
                defaultValue: 0,
            },
            price_usd: {
                type: FLOAT,
                defaultValue: 0,
            },
            change_1h: {
                type: FLOAT,
                defaultValue: 0,
            },
            change_24h: {
                type: FLOAT,
                defaultValue: 0,
            },
            change_7d: {
                type: FLOAT,
                defaultValue: 0,
            },
            checkedAt: {
                type: DATE,
            },
            createdAt: {
                type: DATE,
            },
            updatedAt: {
                type: DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('cryptos');
    },
};
