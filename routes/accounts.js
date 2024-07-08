const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, accountsController.createAccount);
router.get('/', authenticate, accountsController.getAccounts);

module.exports = router;
