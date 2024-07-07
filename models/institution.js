const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Institution = sequelize.define('Institution', {
    id_institution: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    institution_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_institution_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'InstitutionTypes',
            key: 'id_institution_type'
        }
    }
});

module.exports = Institution;
