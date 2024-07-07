const express = require('express');
const router = express.Router();
const institutionsController = require('../controllers/institutionsController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, institutionsController.createInstitution);
router.get('/', authenticate, institutionsController.getInstitutions);

module.exports = router;
