const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Country = sequelize.define('Country', {
    id_country: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    country_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'Country',
    freezeTableName: true
});

module.exports = Country;
