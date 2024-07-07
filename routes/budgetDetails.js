const express = require('express');
const router = express.Router();
const budgetDetailsController = require('../controllers/budgetDetailsController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, budgetDetailsController.createBudgetDetail);
router.get('/', authenticate, budgetDetailsController.getBudgetDetails);

module.exports = router;
