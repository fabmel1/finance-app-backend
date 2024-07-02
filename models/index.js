const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Importar modelos
const User = require('./user');
const UserDetail = require('./userDetail');
const Transaction = require('./transaction');
const Obligation = require('./obligation');
const TransactionType = require('./transactionType');
const Budget = require('./budget');
const ThirdParty = require('./thirdParty');

// Definir relaciones
User.hasOne(UserDetail, { foreignKey: 'id_user' });
UserDetail.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(Transaction, { foreignKey: 'id_user' });
Transaction.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(Obligation, { foreignKey: 'id_user' });
Obligation.belongsTo(User, { foreignKey: 'id_user' });

TransactionType.hasMany(Transaction, { foreignKey: 'id_transaction_type' }); 
Transaction.belongsTo(TransactionType, { foreignKey: 'id_transaction_type' }); 

Budget.hasMany(Transaction, { foreignKey: 'id_budget' }); 
Transaction.belongsTo(Budget, { foreignKey: 'id_budget' }); 

ThirdParty.hasMany(Transaction, { foreignKey: 'id_third_party' }); 
Transaction.belongsTo(ThirdParty, { foreignKey: 'id_third_party' }); 

Obligation.hasMany(Transaction, { foreignKey: 'id_obligation', allowNull: true }); // optional relationhip
Transaction.belongsTo(Obligation, { foreignKey: 'id_obligation', allowNull: true }); // optional relationhip


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
    Obligation,
    TransactionType,
    Budget,
    ThirdParty
};
