const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

// Importar rutas de administrador
const adminRoutes = require('./routes/admin'); 

// Importar otras rutas
const usersRoutes = require('./routes/users');
const userDetailsRoutes = require('./routes/userDetails');
const familiesRoutes = require('./routes/families');
const notificationsRoutes = require('./routes/notifications');
const bankSMSRoutes = require('./routes/banksSMS');
const institutionsRoutes = require('./routes/institutions');
const institutionTypesRoutes = require('./routes/institutionTypes');
const creditCardsRoutes = require('./routes/creditCards');
const categoriesRoutes = require('./routes/categories');
const obligationsRoutes = require('./routes/obligations');
const subcategoriesRoutes = require('./routes/subcategories');
const currenciesRoutes = require('./routes/currencies');
const countriesRoutes = require('./routes/countries'); 
const thirdPartiesRoutes = require('./routes/thirdParties'); 
const transactionTypesRoutes = require('./routes/transactionTypes');

const app = express();

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Rutas administrador
app.use('/admin', adminRoutes);

// Otras rutas
app.use('/users', usersRoutes);
app.use('/userDetails', userDetailsRoutes);
app.use('/families', familiesRoutes);
app.use('/notifications', notificationsRoutes);
app.use('/banksSMS', bankSMSRoutes);
app.use('/institutions', institutionsRoutes);
app.use('/institutionTypes', institutionTypesRoutes);
app.use('/creditCards', creditCardsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/obligations', obligationsRoutes);
app.use('/subcategories', subcategoriesRoutes);
app.use('/currencies', currenciesRoutes);
app.use('/countries', countriesRoutes);
app.use('/thirdParties', thirdPartiesRoutes);
app.use('/transactionTypes', transactionTypesRoutes);

// Sincronizar la base de datos y empezar el servidor
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});
