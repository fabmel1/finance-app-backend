const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BankSMS = sequelize.define('BankSMS', {
    id_sms: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message_content: {
        type: DataTypes.STRING,
        allowNull: true
    },
    received_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'BankSMS',
    freezeTableName: true
});

module.exports = BankSMS;
