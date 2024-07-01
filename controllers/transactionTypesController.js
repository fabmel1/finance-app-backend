const { TransactionType } = require('../models');

exports.createTransactionType = async (req, res) => {
    try {
        const { transaction_type_name, transaction_type_address } = req.body;
        const transactionType = await TransactionType.create({ transaction_type_name, transaction_type_address });
        res.status(201).json(transactionType);
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
