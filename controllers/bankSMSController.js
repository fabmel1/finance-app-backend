const { BankSMS, User } = require('../models');

exports.createBankSMS = async (req, res) => {
    try {
        const { id_user, message_content, received_at } = req.body;
        const user = await User.findByPk(id_user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const notification = await BankSMS.create({ id_user, message_content, received_at });
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getBankSMS = async (req, res) => {
    try {
        const notifications = await BankSMS.findAll();
        res.json(notifications);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
