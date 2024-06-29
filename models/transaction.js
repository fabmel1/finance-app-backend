const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
    id_transaction: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_transaction_type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date_transaction: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_subcategory: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_credit_card: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_budget: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_account: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_obligation: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_third_party: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = Transaction;
