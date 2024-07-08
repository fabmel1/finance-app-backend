const express = require('express');
const router = express.Router();
const currenciesController = require('../controllers/currenciesController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, currenciesController.createCurrency);
router.get('/', authenticate, currenciesController.getCurrencies);

module.exports = router;