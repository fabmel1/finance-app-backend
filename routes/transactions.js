const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
const authenticate = require('../middlewares/auth'); // Asegúrate de tener autenticación para esta ruta

router.post('/', authenticate, transactionsController.createTransactions);
router.get('/', authenticate, transactionsController.getTransactions);
router.delete('/:id', authenticate, transactionsController.deleteTransaction);
router.delete('/', authenticate, transactionsController.deleteTransactions);
router.put('/:id', authenticate, transactionsController.updateTransaction);

module.exports = router;
