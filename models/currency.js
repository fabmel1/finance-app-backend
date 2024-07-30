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
    },
    id_country: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Country',
            key: 'id_country'
        }
    },    
    system_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    tableName: 'Currency',
    freezeTableName: true
});

module.exports = Currency;