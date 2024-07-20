const { Notification, User } = require('../models');

exports.createNotification = async (req, res) => {
    try {
        const { name_notification, id_user, message, scheduled_for, sent } = req.body;
        const user = await User.findByPk(id_user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const notification = await Notification.create({ name_notification, id_user, message, scheduled_for, sent });
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.json(notifications);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
