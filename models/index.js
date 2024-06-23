const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo User
const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Definir el modelo Transaction
const Transaction = sequelize.define('Transaction', {
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

// Configurar relaciones
User.hasMany(Transaction);
Transaction.belongsTo(User);

// Sincronizar la base de datos
sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
});

module.exports = {
    User,
    Transaction
};
