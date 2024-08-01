const { Account, AccountType, Institution, Currency } = require('../models');

exports.createAccounts = async (req, res) => {
    try {
        let accounts = req.body;

        // Verificar si es un array o un objeto único
        if (!Array.isArray(accounts)) {
            accounts = [accounts];
        }

        // Verificar si todos los tipos de cuenta, instituciones y monedas existen
        const accountTypeIds = accounts.map(account => account.id_account_type);
        const institutionIds = accounts.map(account => account.id_institution);
        const currencyIds = accounts.map(account => account.id_currency);

        const accountTypes = await AccountType.findAll({
            where: {
                id_account_type: accountTypeIds
            }
        });

        const institutions = await Institution.findAll({
            where: {
                id_institution: institutionIds
            }
        });

        const currencies = await Currency.findAll({
            where: {
                id_currency: currencyIds
            }
        });

        if (accountTypes.length !== new Set(accountTypeIds).size ||
            institutions.length !== new Set(institutionIds).size ||
            currencies.length !== new Set(currencyIds).size) {
            return res.status(404).json({ error: 'One or more required entities not found' });
        }

        const newAccounts = await Account.bulkCreate(accounts);
        res.status(201).json(newAccounts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll({
            include: [AccountType, Institution, Currency]
        });
        res.json(accounts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Account.destroy({
            where: { id_account: id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Account not found' });
        }

        res.status(204).json({ message: 'Account deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteAccounts = async (req, res) => {
    try {
        const { ids } = req.body; // ids should be an array of account IDs
        const deleted = await Account.destroy({
            where: {
                id_account: ids
            }
        });

        res.status(204).json({ message: 'Accounts deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
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
            id_currency
        } = req.body;

        // Verificar si los tipos de cuenta, instituciones y monedas existen
        const accountType = await AccountType.findByPk(id_account_type);
        const institution = await Institution.findByPk(id_institution);
        const currency = await Currency.findByPk(id_currency);

        if (!accountType || !institution || !currency) {
            return res.status(404).json({ error: 'Required entity not found' });
        }

        const [updated] = await Account.update({
            account_name,
            implicit_fees,
            condition_implicit_fees,
            threshold,
            description,
            tax_free,
            balance,
            id_account_type,
            id_institution,
            id_currency
        }, {
            where: { id_account: id }
        });

        if (!updated) {
            return res.status(404).json({ error: 'Account not found' });
        }

        const updatedAccount = await Account.findOne({ where: { id_account: id } });
        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
