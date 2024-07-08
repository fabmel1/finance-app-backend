const express = require('express');
const router = express.Router();
const goalsController = require('../controllers/goalsController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, goalsController.createGoal);
router.get('/', authenticate, goalsController.getGoals);

module.exports = router;
