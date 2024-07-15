const express = require('express');
const router = express.Router();
const familiesController = require('../controllers/familiesController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, familiesController.createFamily);
router.get('/', authenticate, familiesController.getFamilies);

module.exports = router;