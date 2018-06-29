module.exports = {
    up: (queryInterface, { STRING, INTEGER, DATE }) => {
        return queryInterface.createTable('stats', {
            type: {
                type: STRING,
            },
            server: {
                type: STRING,
            },
            value: {
                type: INTEGER,
                defaultValue: 0,
            },
            createdAt: {
                type: DATE,
            },
            updatedAt: {
                type: DATE,
            },
        }, {
            indexes: [
                {
                    unique: true,
                    fields: ['type', 'server'],
                },
            ],
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('stats');
    },
};
