const express = require('express');
const router = express.Router();
const transactionTypesController = require('../controllers/transactionTypesController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, transactionTypesController.createTransactionType);
router.get('/', authenticate, transactionTypesController.getTransactionTypes);

module.exports = router;
