const { Currency } = require('../models');

exports.createCurrency = async (req, res) => {
    try {
        const { currency_name, currency_symbol } = req.body;
        const currency = await Currency.create({ currency_name, currency_symbol });
        res.status(201).json(currency);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCurrencies = async (req, res) => {
    try {
        const currencies = await Currency.findAll();
        res.json(currencies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
