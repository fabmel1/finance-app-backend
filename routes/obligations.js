const express = require('express');
const router = express.Router();
const obligationsController = require('../controllers/obligationsController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, obligationsController.createObligation);
router.get('/', authenticate, obligationsController.getObligations);

module.exports = router;
