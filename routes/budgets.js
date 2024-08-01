const express = require('express');
const router = express.Router();
const budgetsController = require('../controllers/budgetsController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, budgetsController.createBudgets);
router.get('/', authenticate, budgetsController.getBudgets);
router.delete('/:id', authenticate, budgetsController.deleteBudget);
router.delete('/', authenticate, budgetsController.deleteBudgets);
router.put('/:id', authenticate, budgetsController.updateBudget);

module.exports = router;
