const sequelize = require('../config/database');

const User = require('./user');
const UserDetail = require('./userDetail');
const Family = require('./family');
const Notification = require('./notification');
const BankSMS = require('./bankSMS');
const InstitutionType = require('./institutionType');
const Institution = require('./institution');
const CreditCard = require('./creditCard');

// Definir relaciones
User.hasOne(UserDetail, { foreignKey: 'id_user', onDelete: 'CASCADE' });
UserDetail.belongsTo(User, { foreignKey: 'id_user' });

Family.hasMany(UserDetail, { foreignKey: 'id_family' });
UserDetail.belongsTo(Family, { foreignKey: 'id_family' });

User.hasMany(Notification, { foreignKey: 'id_user' });
Notification.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(BankSMS, { foreignKey: 'id_user' });
BankSMS.belongsTo(User, { foreignKey: 'id_user' });

InstitutionType.hasMany(Institution, { foreignKey: 'id_institution_type' });
Institution.belongsTo(InstitutionType, { foreignKey: 'id_institution_type' });

Institution.hasMany(CreditCard, { foreignKey: 'id_institution' });
CreditCard.belongsTo(Institution, { foreignKey: 'id_institution' });

User.hasMany(CreditCard, { foreignKey: 'id_user' });
CreditCard.belongsTo(User, { foreignKey: 'id_user' });


// Sincronizar la base de datos
sequelize.sync().then(() => {
    console.log('Database & tables created!');
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});

module.exports = {
    User,
    UserDetail,
    Family,
    Notification,
    BankSMS,
    InstitutionType,
    Institution,
    CreditCard
};
