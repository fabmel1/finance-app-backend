const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Budget = sequelize.define('Budget', {
    id_budget: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    budget_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Budget;
