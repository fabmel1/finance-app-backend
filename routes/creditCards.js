const express = require('express');
const router = express.Router();
const creditCardsController = require('../controllers/creditCardsController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, creditCardsController.createCreditCard);
router.get('/', authenticate, creditCardsController.getCreditCards);
router.patch('/balance', authenticate, creditCardsController.updateCreditCardBalance);

module.exports = router;
