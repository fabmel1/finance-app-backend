const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Currency = sequelize.define('Currency', {
    id_currency: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    currency_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currency_symbol: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Currency;