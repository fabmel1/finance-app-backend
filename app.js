const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const usersRoutes = require('./routes/users');
const transactionsRoutes = require('./routes/transactions');
const obligationsRoutes = require('./routes/obligations');
const transactionTypesRoutes = require('./routes/transactionTypes');
const budgetsRoutes = require('./routes/budgets.js');
const userDetailsRoutes = require('./routes/userDetails');
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
app.use('/userDetails', userDetailsRoutes); 
app.use('/thirdParties', thirdPartiesRoutes);

// Sincronizar la base de datos y empezar el servidor
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});
