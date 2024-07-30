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
    },
    system_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    tableName: 'InstitutionType',
    freezeTableName: true
});

module.exports = InstitutionType;
