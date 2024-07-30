const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Obligation = sequelize.define('Obligation', {
    id_obligation: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name_obligation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    due_day: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ideal_day: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_subcategory: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
         references: {
            model: 'User', 
            key: 'id_user'
        }
    },
    system_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    tableName: 'Obligation',
    freezeTableName: true
});

module.exports = Obligation;