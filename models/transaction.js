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
        allowNull: false,
        references: {
            model: 'TransactionType',
            key: 'id_transaction_type'
        }
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
    id_credit_card: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_budget: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Budget',
            key: 'id_budget'
        }
    },
    id_account: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Account',
            key: 'id_account'
        }
    },
    id_obligation: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id_user'
        }
    },
    id_third_party: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'ThirdParty',
            key: 'id_third_party'
        }
    }
}, {
    timestamps: true,
    tableName: 'Transaction',
    freezeTableName: true
});

module.exports = Transaction;
