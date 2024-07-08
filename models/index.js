const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Importar modelos
const User = require('./user');
const UserDetail = require('./userDetail');
const Transaction = require('./transaction');
const Obligation = require('./obligation');
const TransactionType = require('./transactionType');
const Budget = require('./budget');
const BudgetDetail = require('./budgetDetail');
const Subcategory = require('./subcategory');
const Category = require('./category');
const InstitutionType = require('./institutionType');
const Institution = require('./institution');
const CreditCard = require('./creditCard');
const ThirdParty = require('./thirdParty');

// Definir relaciones
User.hasOne(UserDetail, { foreignKey: 'id_user', onDelete: 'CASCADE' });
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

Obligation.hasMany(Transaction, { foreignKey: 'id_obligation', allowNull: true });
Transaction.belongsTo(Obligation, { foreignKey: 'id_obligation', allowNull: true });

Budget.hasMany(BudgetDetail, { foreignKey: 'id_budget' });
BudgetDetail.belongsTo(Budget, { foreignKey: 'id_budget' });

Subcategory.hasMany(BudgetDetail, { foreignKey: 'id_subcategory' });
BudgetDetail.belongsTo(Subcategory, { foreignKey: 'id_subcategory' });

Category.hasMany(Subcategory, { foreignKey: 'id_category' });
Subcategory.belongsTo(Category, { foreignKey: 'id_category' });

InstitutionType.hasMany(Institution, { foreignKey: 'id_institution_type' });
Institution.belongsTo(InstitutionType, { foreignKey: 'id_institution_type' });

User.hasMany(CreditCard, { foreignKey: 'id_user' });
CreditCard.belongsTo(User, { foreignKey: 'id_user' });

Institution.hasMany(CreditCard, { foreignKey: 'id_institution' });
CreditCard.belongsTo(Institution, { foreignKey: 'id_institution' });

CreditCard.hasMany(Transaction, { foreignKey: 'id_credit_card', allowNull: true });
Transaction.belongsTo(CreditCard, { foreignKey: 'id_credit_card', allowNull: true });

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
    BudgetDetail,
    Subcategory,
    Category,
    InstitutionType,
    Institution,    
    CreditCard,    
    ThirdParty
};
