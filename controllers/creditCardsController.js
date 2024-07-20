const { CreditCard, User, Institution, Transaction } = require('../models');

exports.createCreditCard = async (req, res) => {
    try {
        const { credit_card_name, balance, credit_card_limit, id_institution, id_user } = req.body;
        const user = await User.findByPk(id_user);
        const institution = await Institution.findByPk(id_institution);

        if (!user || !institution) {
            return res.status(404).json({ error: 'User or Institution not found' });
        }

        const creditCard = await CreditCard.create({
            credit_card_name,
            balance,
            credit_card_limit,
            id_institution,
            id_user
            
        });

        res.status(201).json(creditCard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCreditCards = async (req, res) => {
    try {
        const creditCards = await CreditCard.findAll({
            include: [User, Institution]
        });
        res.json(creditCards);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateCreditCardBalance = async (req, res) => {
    try {
        const { id_credit_card, amount } = req.body;
        const creditCard = await CreditCard.findByPk(id_credit_card);

        if (!creditCard) {
            return res.status(404).json({ error: 'Credit card not found' });
        }

        creditCard.balance += amount;
        await creditCard.save();

        res.status(200).json(creditCard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
