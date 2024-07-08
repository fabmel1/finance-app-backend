const { Account, AccountType, Institution, Currency, Goal } = require('../models');

exports.createAccount = async (req, res) => {
    try {
        const {
            account_name,
            implicit_fees,
            condition_implicit_fees,
            threshold,
            description,
            tax_free,
            balance,
            id_account_type,
            id_institution,
            id_currency,
            id_goal
        } = req.body;

        const accountType = await AccountType.findByPk(id_account_type);
        const institution = await Institution.findByPk(id_institution);
        const currency = await Currency.findByPk(id_currency);
        const goal = id_goal ? await Goal.findByPk(id_goal) : null;

        if (!accountType || !institution || !currency || (id_goal && !goal)) {
            return res.status(404).json({ error: 'Required entity not found' });
        }

        const account = await Account.create({
            account_name,
            implicit_fees,
            condition_implicit_fees,
            threshold,
            description,
            tax_free,
            balance,
            id_account_type,
            id_institution,
            id_currency,
            id_goal
        });

        res.status(201).json(account);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll({
            include: [AccountType, Institution, Currency, Goal]
        });
        res.json(accounts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
