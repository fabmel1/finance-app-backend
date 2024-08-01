const express = require('express');
const router = express.Router();
const goalsController = require('../controllers/goalsController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, goalsController.createGoals);
router.get('/', authenticate, goalsController.getGoals);
router.delete('/:id', authenticate, goalsController.deleteGoal);
router.delete('/', authenticate, goalsController.deleteGoals);
router.put('/:id', authenticate, goalsController.updateGoal);

module.exports = router;
