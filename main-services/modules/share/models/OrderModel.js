const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;
const db = require('../databases/Database');

const OrderModel = db.define(
    'order',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        tax: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        status: {
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

module.exports = OrderModel;
