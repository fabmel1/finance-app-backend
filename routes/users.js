const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const userActionsController = require('../controllers/userActionsController');
const authenticate = require('../middlewares/auth');

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/', authenticate, userActionsController.getUsers);

module.exports = router;
