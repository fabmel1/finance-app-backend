const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Goal = sequelize.define('Goal', {
    id_goal: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    goal_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    goal_description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    goal_amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    goal_progress: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    id_currency: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Currency',
            key: 'id_currency'
        }
    }
}, {
    timestamps: true,
    tableName: 'Goal',
    freezeTableName: true
});

module.exports = Goal;
