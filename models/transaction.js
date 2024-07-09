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
            model: 'TransactionTypes',
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
    id_subcategory: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_credit_card: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'CreditCards',
            key: 'id_credit_card'
        }
    },
    id_budget: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'budget',
            key: 'id_budget'
        }
    },
    id_account: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_obligation: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'obligation',
            key: 'id_obligation'
        }
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id_user'
        }
    },
    id_third_party: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'thirdParty',
            key: 'id_third_party'
        }
    }
});

module.exports = Transaction;
