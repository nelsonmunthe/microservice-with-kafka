const { Sequelize } = require('sequelize');

let db = new Sequelize('microservices', 'root', 'Lumbanpaung,050490', {
    dialect: 'mysql',
    port: process.env.DB_PORT,
    pool: {
        max: 500,
        min: 30,
        acquire: 60000,
        idle: 30000,
    },
    dialectOptions: {
        // @see https://github.com/sequelize/sequelize/issues/8019
        maxPreparedStatements: 100,
    },
});

// export connection
/**
 * @type {Sequelize}
 */
module.exports = db;
