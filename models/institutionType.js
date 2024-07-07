const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InstitutionType = sequelize.define('InstitutionType', {
    id_institution_type: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    institution_type_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = InstitutionType;
