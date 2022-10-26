const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;
const db = require('../databases/Database');

const OrderStateModel = db.define(
    'notifications',
    {
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        noted: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports = OrderStateModel;
