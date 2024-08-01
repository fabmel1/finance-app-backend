const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Account = sequelize.define('Account', {
    id_account: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    account_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    implicit_fees: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    condition_implicit_fees: {
        type: DataTypes.STRING,
        allowNull: true
    },
    threshold: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tax_free: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    id_account_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'AccountType',
            key: 'id_account_type'
        }
    },
    id_institution: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Institution',
            key: 'id_institution'
        }
    },
    id_currency: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Currency',
            key: 'id_currency'
        }
    },
    id_goal: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: 'Account',
    freezeTableName: true
});

module.exports = Account;
