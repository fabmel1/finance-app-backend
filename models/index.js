const sequelize = require('../config/database');

const User = require('./user');
const UserDetail = require('./userDetail');
const Family = require('./family');
const Notification = require('./notification');
const BankSMS = require('./bankSMS');
const InstitutionType = require('./institutionType');
const Institution = require('./institution');
const CreditCard = require('./creditCard');
const Category = require('./category');
const Subcategory = require('./subcategory');
const TransactionType = require('./transactionType');
const Obligation = require('./obligation');
const Currency = require('./currency');
const Country = require('./country');
const ThirdParty = require('./thirdParty');
const AccountType = require('./accountType');
const Goal = require('./goal');
const Account = require('./account');
const Budget = require('./budget');
const BudgetDetail = require('./budgetDetail');
const Transaction = require('./transaction');

// Definir relaciones
User.hasOne(UserDetail, { foreignKey: 'id_user', onDelete: 'CASCADE' });
UserDetail.belongsTo(User, { foreignKey: 'id_user' });

Family.hasMany(UserDetail, { foreignKey: 'id_family' });
UserDetail.belongsTo(Family, { foreignKey: 'id_family' });

User.hasMany(Notification, { foreignKey: 'id_user' });
Notification.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(Obligation, { foreignKey: 'id_user' });
Obligation.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(BankSMS, { foreignKey: 'id_user' });
BankSMS.belongsTo(User, { foreignKey: 'id_user' });

InstitutionType.hasMany(Institution, { foreignKey: 'id_institution_type' });
Institution.belongsTo(InstitutionType, { foreignKey: 'id_institution_type' });

Institution.hasMany(CreditCard, { foreignKey: 'id_institution' });
CreditCard.belongsTo(Institution, { foreignKey: 'id_institution' });

Institution.hasMany(Account, { foreignKey: 'id_institution' });
Account.belongsTo(Institution, { foreignKey: 'id_institution' });

User.hasMany(CreditCard, { foreignKey: 'id_user' });
CreditCard.belongsTo(User, { foreignKey: 'id_user' });

Category.hasMany(Subcategory, { foreignKey: 'id_category' });
Subcategory.belongsTo(Category, { foreignKey: 'id_category' });

Subcategory.hasMany(Obligation, { foreignKey: 'id_subcategory' });
Obligation.belongsTo(Subcategory, { foreignKey: 'id_subcategory' });

TransactionType.hasMany(Transaction, { foreignKey: 'id_transaction_type' });
Transaction.belongsTo(TransactionType, { foreignKey: 'id_transaction_type' });

Country.hasMany(Currency, { foreignKey: 'id_country' });
Currency.belongsTo(Country, { foreignKey: 'id_country' });

AccountType.hasMany(Account, { foreignKey: 'id_account_type' });
Account.belongsTo(AccountType, { foreignKey: 'id_account_type' });

Currency.hasMany(Goal, { foreignKey: 'id_currency' });
Goal.belongsTo(Currency, { foreignKey: 'id_currency' });

Currency.hasMany(Account, { foreignKey: 'id_currency' });
Account.belongsTo(Currency, { foreignKey: 'id_currency' });

Goal.hasMany(Account, { foreignKey: 'id_goal' });
Account.belongsTo(Goal, { foreignKey: 'id_goal' });

Budget.hasMany(BudgetDetail, { foreignKey: 'id_budget', onDelete: 'CASCADE' });
BudgetDetail.belongsTo(Budget, { foreignKey: 'id_budget' });

Subcategory.hasMany(BudgetDetail, { foreignKey: 'id_budget' });
BudgetDetail.belongsTo(Subcategory, { foreignKey: 'id_budget' });

ThirdParty.hasMany(Transaction, { foreignKey: 'id_third_party' });
Transaction.belongsTo(ThirdParty, { foreignKey: 'id_third_party' });


// Sincronizar la base de datos
sequelize.sync().then(() => {
    console.log('Database & tables created!');
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});

// Exportar modulos
module.exports = {
    sequelize,
    User,
    UserDetail,
    Family,
    Notification,
    BankSMS,
    InstitutionType,
    Institution,
    CreditCard,
    Category,
    Subcategory,
    TransactionType,
    Obligation,
    Currency,
    Country,
    ThirdParty,
    Account,
    Goal,
    AccountType,
    Budget,
    BudgetDetail,
    Transaction
};
