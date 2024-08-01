const express = require('express');
const router = express.Router();
const accountTypesController = require('../controllers/accountTypesController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, accountTypesController.createAccountTypes);
router.get('/', authenticate, accountTypesController.getAccountTypes);
router.delete('/:id', authenticate, accountTypesController.deleteAccountType);
router.delete('/', authenticate, accountTypesController.deleteAccountTypes);
router.put('/:id', authenticate, accountTypesController.updateAccountType);

module.exports = router;
