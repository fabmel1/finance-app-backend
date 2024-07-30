const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subcategory = sequelize.define('Subcategory', {
    id_subcategory: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subcategory_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Category', 
            key: 'id_category'
        }
    },
    system_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    tableName: 'Subcategory',
    freezeTableName: true
});

module.exports = Subcategory;