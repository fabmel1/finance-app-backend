const { Currency } = require('../models');

exports.createCurrency = async (req, res) => {
    try {
        let currencies = req.body;

        // Verificar si es un array o un objeto único
        if (!Array.isArray(currencies)) {
            currencies = [currencies];
        }

        const newCurrencies = await Currency.bulkCreate(currencies);
        res.status(201).json(newCurrencies);
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
