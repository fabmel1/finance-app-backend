const express = require('express');
const router = express.Router();
const bankSMSController = require('../controllers/bankSMSController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, bankSMSController.createBankSMS);
router.get('/', authenticate, bankSMSController.getBankSMS);

module.exports = router;