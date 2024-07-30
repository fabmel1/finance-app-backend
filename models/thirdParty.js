const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ThirdParty = sequelize.define('ThirdParty', {
    id_third_party: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    global_business_identifier: {
        type: DataTypes.STRING,
        allowNull: false
    },
    third_party_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    third_party_description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: 'ThirdParty',
    freezeTableName: true
});

module.exports = ThirdParty;
