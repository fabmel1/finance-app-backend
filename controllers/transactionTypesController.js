const { TransactionType } = require('../models');

exports.createTransactionType = async (req, res) => {
    try {
        let transactionTypes = req.body;
        if (!Array.isArray(transactionTypes)) {
            transactionTypes = [transactionTypes];
        }

        const newTransactionTypes = await TransactionType.bulkCreate(transactionTypes);
        res.status(201).json(newTransactionTypes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTransactionTypes = async (req, res) => {
    try {
        const transactionTypes = await TransactionType.findAll();
        res.json(transactionTypes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

