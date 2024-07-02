const { ThirdParty } = require('../models');

exports.createThirdParty = async (req, res) => {
    try {
        const { global_business_identifier, third_party_name, third_party_description } = req.body;
        const thirdParty = await ThirdParty.create({ global_business_identifier, third_party_name, third_party_description });
        res.status(201).json(thirdParty);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getThirdParties = async (req, res) => {
    try {
        const thirdParties = await ThirdParty.findAll();
        res.json(thirdParties);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
