require('dotenv').config();

const {
    POSTGRESQL_PORT,
    POSTGRESQL_HOST,
    POSTGRESQL_USER,
    POSTGRESQL_PASSWORD,
    POSTGRESQL_DB,
} = process.env;
const config = {
    username: POSTGRESQL_USER,
    password: POSTGRESQL_PASSWORD,
    database: POSTGRESQL_DB,
    host: POSTGRESQL_HOST,
    port: POSTGRESQL_PORT,
    dialect: 'postgres',
    operatorsAliases: false,
};

module.exports = {
    development: config,
    production: config,
};
