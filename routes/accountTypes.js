const express = require('express');
const router = express.Router();
const accountTypesController = require('../controllers/accountTypesController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, accountTypesController.createAccountType);
router.get('/', authenticate, accountTypesController.getAccountTypes);

module.exports = router;
