const { Transaction, User } = require('../models');

exports.createTransaction = async (req, res) => {
    try {
        const { type, category, amount, date } = req.body;
        const user = await User.findByPk(req.userId); 
        const transaction = await user.createTransaction({ type, category, amount, date });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId); 
        const transactions = await user.getTransactions();
        res.json(transactions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
