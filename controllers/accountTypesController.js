const { AccountType } = require('../models');

exports.createAccountType = async (req, res) => {
    try {
        const { account_type_name } = req.body;
        const accountType = await AccountType.create({ account_type_name });
        res.status(201).json(accountType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAccountTypes = async (req, res) => {
    try {
        const accountTypes = await AccountType.findAll();
        res.json(accountTypes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
