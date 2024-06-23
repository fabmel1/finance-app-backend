const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const usersRoutes = require('./routes/users');
const transactionsRoutes = require('./routes/transactions');

const app = express();

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Rutas
app.use('/users', usersRoutes);
app.use('/transactions', transactionsRoutes);

// Sincronizar la base de datos y empezar el servidor
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});
