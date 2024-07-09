const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

//Import routes
const usersRoutes = require('./routes/users');
const transactionsRoutes = require('./routes/transactions');
const obligationsRoutes = require('./routes/obligations');
const transactionTypesRoutes = require('./routes/transactionTypes');
const budgetsRoutes = require('./routes/budgets.js');
const budgetDetailsRoutes = require('./routes/budgetDetails');
const subcategoriesRoutes = require('./routes/subcategories');
const categoriesRoutes = require('./routes/categories');
const institutionTypeRoutes = require('./routes/institutionTypes')
const institutionsRoutes = require('./routes/institutions');
const creditCardsRoutes = require('./routes/creditCards');
const userDetailsRoutes = require('./routes/userDetails');
const currenciesRoutes = require('./routes/currencies');
const goalsRoutes = require('./routes/goals');
const accountTypesRoutes = require('./routes/accountTypes');
const accountsRoutes = require('./routes/accounts');
const thirdPartiesRoutes = require('./routes/thirdParties'); 

const app = express();

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Rutas
app.use('/users', usersRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/obligations', obligationsRoutes);
app.use('/transactionTypes', transactionTypesRoutes);
app.use('/budgets', budgetsRoutes);
app.use('/budgetDetails', budgetDetailsRoutes);
app.use('/subcategories', subcategoriesRoutes);
app.use('/categories', categoriesRoutes);
app.use('/institutionTypes', institutionTypeRoutes);
app.use('/institutions', institutionsRoutes);
app.use('/creditCards', creditCardsRoutes);
app.use('/userDetails', userDetailsRoutes);
app.use('/currencies', currenciesRoutes);
app.use('/goals', goalsRoutes);
app.use('/accountTypes', accountTypesRoutes);
app.use('/accounts', accountsRoutes);
app.use('/thirdParties', thirdPartiesRoutes);

// Sincronizar la base de datos y empezar el servidor
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});
