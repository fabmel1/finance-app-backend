const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Family = sequelize.define('Family', {
    id_family: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    family_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Family;