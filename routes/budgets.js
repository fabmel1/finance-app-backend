const express = require('express');
const router = express.Router();
const budgetsController = require('../controllers/budgetsController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, budgetsController.createBudget);
router.get('/', authenticate, budgetsController.getBudgets);

module.exports = router;
