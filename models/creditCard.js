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
    credit_card_limit: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id_user'
        }
    },
    id_institution: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Institutions',
            key: 'id_institution'
        }
    }
});

module.exports = CreditCard;
