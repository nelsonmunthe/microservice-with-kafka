const { Sequelize } = require('sequelize');

let db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    port: process.env.DB_PORT,
    pool: {
        max: 500,
        min: 30,
        acquire: 60000,
        idle: 30000,
    },
    dialectOptions: {
        maxPreparedStatements: 100,
    },
});

// export connection
/**
 * @type {Sequelize}
 */
module.exports = db;
