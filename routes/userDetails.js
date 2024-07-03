const express = require('express');
const router = express.Router();
const userDetailsController = require('../controllers/userDetailsController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, userDetailsController.createUserDetail);
router.get('/', authenticate, userDetailsController.getUserDetails);

module.exports = router;
