const express = require('express');
const router = express.Router();
const budgetDetailsController = require('../controllers/budgetDetailsController');
const authenticate = require('../middlewares/auth'); // Asegúrate de tener autenticación para esta ruta

router.post('/', authenticate, budgetDetailsController.createBudgetDetails);
router.get('/', authenticate, budgetDetailsController.getBudgetDetails);
router.delete('/:id', authenticate, budgetDetailsController.deleteBudgetDetail);
router.delete('/', authenticate, budgetDetailsController.deleteBudgetDetails);
router.put('/:id', authenticate, budgetDetailsController.updateBudgetDetail);

module.exports = router;
