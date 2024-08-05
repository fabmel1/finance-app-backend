const { Transaction, User, ThirdParty, TransactionType, Budget, Obligation, CreditCard, Account } = require('../models');

exports.createTransactions = async (req, res) => {
    try {
        let transactions = req.body;

        // Verificar si es un array o un objeto único
        if (!Array.isArray(transactions)) {
            transactions = [transactions];
        }

        const createdTransactions = [];
        
        for (const transactionData of transactions) {
            const {
                id_transaction_type,
                amount,
                date_transaction,
                description,
                id_credit_card,
                id_budget,
                id_account,
                id_obligation,
                id_user,
                id_third_party                
            } = transactionData;

            // Verificar si el transaction type existe
            const transactionType = await TransactionType.findByPk(id_transaction_type);
            if (!transactionType) {
                return res.status(404).json({ error: 'Transaction type not found' });
            }

            // Verificar si la credit card existe (si se proporciona)
            let creditCard = null;
            if (id_credit_card) {
                creditCard = await CreditCard.findByPk(id_credit_card);
                if (!creditCard) {
                    return res.status(404).json({ error: 'Credit card not found' });
                }
            }            

            // Verificar si el budget existe (si se proporciona)
            let budget = null;
            if (id_budget) {
                budget = await Budget.findByPk(id_budget);
                if (!budget) {
                    return res.status(404).json({ error: 'Budget not found' });
                }
            }

            // Verificar si la account existe (si se proporciona)
            let account = null;
            if (id_account) {
                account = await Account.findByPk(id_account);
                if (!account) {
                    return res.status(404).json({ error: 'Account not found' });
                }
            }

            // Verificar si la obligation existe (si se proporciona)
            let obligation = null;
            if (id_obligation) {
                obligation = await Obligation.findByPk(id_obligation);
                if (!obligation) {
                    return res.status(404).json({ error: 'Obligation not found' });
                }
            }

            const user = await User.findByPk(id_user);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            // Verificar si el third party ya existe
            const thirdParty = await ThirdParty.findByPk(id_third_party);
            if (!thirdParty) {
                return res.status(404).json({ error: 'Third party not found' });
            }            

            // Crear una transacción asociada al usuario y a las demás relaciones
            const transaction = await Transaction.create({
                id_transaction_type,
                amount,
                date_transaction,
                description,
                id_credit_card,
                id_budget,
                id_account,
                id_obligation,
                id_user,
                id_third_party
            });

            // Actualizar el balance de la tarjeta de crédito si está presente
            if (creditCard) {
                creditCard.balance += amount;
                await creditCard.save();
            }

            // Actualizar el balance de la cuenta si está presente
            if (account) {
                account.balance += amount;
                await account.save();
            }

            createdTransactions.push(transaction);
        }

        res.status(201).json(createdTransactions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const transactions = await Transaction.findAll({
            where: { id_user: req.userId },
            include: [ThirdParty, TransactionType, Budget, Obligation, CreditCard, Account]
        });
        res.json(transactions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Transaction.destroy({
            where: { id_transaction: id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(204).json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTransactions = async (req, res) => {
    try {
        const { ids } = req.body; // ids should be an array of transaction IDs
        const deleted = await Transaction.destroy({
            where: {
                id_transaction: ids
            }
        });

        res.status(204).json({ message: 'Transactions deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            id_transaction_type,
            amount,
            date_transaction,
            description,
            id_credit_card,
            id_budget,
            id_account,
            id_obligation,
            id_user,
            id_third_party
        } = req.body;

        const user = await User.findByPk(id_user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verificar si el third party ya existe
        const thirdParty = await ThirdParty.findByPk(id_third_party);
        if (!thirdParty) {
            return res.status(404).json({ error: 'Third party not found' });
        }

        const [updated] = await Transaction.update({
            id_transaction_type,
            amount,
            date_transaction,
            description,
            id_credit_card,
            id_budget,
            id_account,
            id_obligation,
            id_user,
            id_third_party
        }, {
            where: { id_transaction: id }
        });

        if (!updated) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        const updatedTransaction = await Transaction.findOne({ where: { id_transaction: id } });
        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
