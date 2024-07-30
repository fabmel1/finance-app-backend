const { Country } = require('../models');

exports.createCountry = async (req, res) => {
    const { country_name } = req.body;
    try {
        const newCountry = await Country.create({ country_name });
        res.status(201).json(newCountry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCountries = async (req, res) => {
    try {
        const countries = await Country.findAll();
        res.json(countries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
