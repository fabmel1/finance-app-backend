const { Transaction, User, ThirdParty, TransactionType, Budget, Obligation, CreditCard, Account } = require('../models');

exports.createTransaction = async (req, res) => {
    try {
        const {
            id_transaction_type,
            amount,
            date_transaction,
            description,
            id_credit_card,
            id_budget,
            id_account,
            id_obligation,
            id_third_party,
            third_party_name,
            third_party_description
        } = req.body;

        console.log('User ID:', req.userId);

        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Verificar si el third party ya existe
        let thirdParty = null;
        if (id_third_party) {
            thirdParty = await ThirdParty.findByPk(id_third_party);
        } else if (third_party_name) {
            thirdParty = await ThirdParty.findOne({ where: { third_party_name } });
            if (!thirdParty) {
                // Crear un nuevo third party si no existe
                thirdParty = await ThirdParty.create({ third_party_name, third_party_description });
            }
        }

        // Verificar si el transaction type existe
        const transactionType = await TransactionType.findByPk(id_transaction_type);
        if (!transactionType) {
            return res.status(404).json({ error: 'Transaction type not found' });
        }

        // Verificar si el budget existe (si se proporciona)
        let budget = null;
        if (id_budget) {
            budget = await Budget.findByPk(id_budget);
            if (!budget) {
                return res.status(404).json({ error: 'Budget not found' });
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

        // Verificar si la credit card existe (si se proporciona)
        let creditCard = null;
        if (id_credit_card) {
            creditCard = await CreditCard.findByPk(id_credit_card);
            if (!creditCard) {
                return res.status(404).json({ error: 'Credit card not found' });
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

        // Crear una transacción asociada al usuario y a las demás relaciones
        const transaction = await user.createTransaction({ 
            id_transaction_type,
            amount,
            date_transaction,
            description,
            id_credit_card,
            id_budget,
            id_account,
            id_obligation,
            id_third_party: thirdParty ? thirdParty.id_third_party : null
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
                
        res.status(201).json(transaction);
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
            include: [ThirdParty, TransactionType, Budget, Obligation, CreditCard, Account] // Incluir CreditCard y Account
        });
        res.json(transactions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
