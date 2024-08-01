const { AccountType } = require('../models');

exports.createAccountTypes = async (req, res) => {
    try {
        let accountTypes = req.body;

        // Verificar si es un array o un objeto único
        if (!Array.isArray(accountTypes)) {
            accountTypes = [accountTypes];
        }

        const newAccountTypes = await AccountType.bulkCreate(accountTypes);
        res.status(201).json(newAccountTypes);
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

exports.deleteAccountType = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await AccountType.destroy({
            where: { id_account_type: id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'AccountType not found' });
        }

        res.status(204).json({ message: 'AccountType deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteAccountTypes = async (req, res) => {
    try {
        const { ids } = req.body; // ids should be an array of account type IDs
        const deleted = await AccountType.destroy({
            where: {
                id_account_type: ids
            }
        });

        res.status(204).json({ message: 'AccountTypes deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateAccountType = async (req, res) => {
    try {
        const { id } = req.params;
        const { account_type_name } = req.body;
        const [updated] = await AccountType.update({ account_type_name }, {
            where: { id_account_type: id }
        });

        if (!updated) {
            return res.status(404).json({ error: 'AccountType not found' });
        }

        const updatedAccountType = await AccountType.findOne({ where: { id_account_type: id } });
        res.status(200).json(updatedAccountType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

