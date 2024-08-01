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
            model: 'Budget',
            key: 'id_budget'
        },
        onDelete: 'CASCADE' 
    },
    id_subcategory: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Subcategory',
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
}, {
    timestamps: true,
    tableName: 'BudgetDetail',
    freezeTableName: true
});

module.exports = BudgetDetail;
