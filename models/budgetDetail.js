const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BudgetDetail = sequelize.define('BudgetDetail', {
    id_budget_detail: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_budget: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Budgets',
            key: 'id_budget'
        }
    },
    id_subcategory: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Subcategories',
            key: 'id_subcategory'
        }
    },
    budget_value: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    budget_detail_desc: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = BudgetDetail;
