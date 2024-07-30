const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Category = sequelize.define('Category', {
    id_category: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    system_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    tableName: 'Category',
    freezeTableName: true
});


module.exports = Category;

