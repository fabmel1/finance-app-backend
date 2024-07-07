const express = require('express');
const router = express.Router();
const institutionTypesController = require('../controllers/institutionTypesController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, institutionTypesController.createInstitutionType);
router.get('/', authenticate, institutionTypesController.getInstitutionTypes);

module.exports = router;
