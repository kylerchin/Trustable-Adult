module.exports = {
    up: (queryInterface, { STRING, DATE }) => {
        return queryInterface.createTable('servers', {
            id: {
                type: STRING,
                primaryKey: true,
            },
            name: {
                type: STRING,
            },
            prefix: {
                type: STRING,
                defaultValue: '!butler ',
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
        return queryInterface.dropTable('servers');
    },
};
