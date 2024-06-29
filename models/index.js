const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Importar modelos
const User = require('./user');
const UserDetail = require('./userDetail');
const Transaction = require('./transaction');
const Obligation = require('./obligation');

// Definir relaciones
User.hasOne(UserDetail, { foreignKey: 'id_user' });
UserDetail.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(Transaction, { foreignKey: 'id_user' });
Transaction.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(Obligation, { foreignKey: 'id_user' });
Obligation.belongsTo(User, { foreignKey: 'id_user' });

// Sincronizar la base de datos
sequelize.sync().then(() => {
    console.log('Database & tables created!');
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});

module.exports = {
    User,
    UserDetail,
    Transaction,
    Obligation
};
