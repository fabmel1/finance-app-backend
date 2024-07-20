const express = require('express');
const router = express.Router();
const institutionsController = require('../controllers/institutionsController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, institutionsController.createInstitutions);
router.get('/', authenticate, institutionsController.getInstitutions);
router.delete('/:id', authenticate, institutionsController.deleteInstitution); 
router.delete('/', authenticate, institutionsController.deleteInstitutions); 

module.exports = router;
