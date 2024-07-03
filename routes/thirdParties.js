const express = require('express');
const router = express.Router();
const thirdPartiesController = require('../controllers/thirdPartiesController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, thirdPartiesController.createThirdParty);
router.get('/', authenticate, thirdPartiesController.getThirdParties);

module.exports = router;
