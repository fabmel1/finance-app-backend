const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserDetail = sequelize.define('UserDetail', {
    id_user_detail: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id_user'
        }
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = UserDetail;
