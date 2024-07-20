const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CreditCard = sequelize.define('CreditCard', {
    id_credit_card: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    credit_card_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    credit_card_limit: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    id_institution: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Institution',
            key: 'id_institution'
        }
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id_user'
        }
    }
}, {
    timestamps: true,
    tableName: 'CreditCard',
    freezeTableName: true
});

module.exports = CreditCard;
