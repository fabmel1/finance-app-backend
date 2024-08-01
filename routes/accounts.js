const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');
const authenticate = require('../middlewares/auth'); // Asegúrate de tener autenticación para esta ruta

router.post('/', authenticate, accountsController.createAccounts);
router.get('/', authenticate, accountsController.getAccounts);
router.delete('/:id', authenticate, accountsController.deleteAccount);
router.delete('/', authenticate, accountsController.deleteAccounts);
router.put('/:id', authenticate, accountsController.updateAccount);

module.exports = router;
