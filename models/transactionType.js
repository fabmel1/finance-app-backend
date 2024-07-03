const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TransactionType = sequelize.define('TransactionType', {
    id_transaction_type: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    transaction_type_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    transaction_type_address: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = TransactionType;
