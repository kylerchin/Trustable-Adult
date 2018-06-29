module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('stats', [
            {
                type: 'commands_executed',
                server: 'all',
                value: 0,
            },
            {
                type: 'polls',
                server: 'all',
                value: 0,
            },
        ], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('stats', null, {});
    },
};
