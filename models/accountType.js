const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AccountType = sequelize.define('AccountType', {
    id_account_type: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    account_type_name: {
        type: DataTypes.STRING,
        allowNull: false
    },    
    system_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    tableName: 'AccountType',
    freezeTableName: true
});

module.exports = AccountType;
