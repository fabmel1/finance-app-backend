const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, notificationsController.createNotification);
router.get('/', authenticate, notificationsController.getNotifications);

module.exports = router;
