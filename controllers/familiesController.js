const { Family } = require('../models');

exports.createFamily = async (req, res) => {
    try {
        const { family_name } = req.body;
        const family = await Family.create({ family_name });
        res.status(201).json(family);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getFamilies = async (req, res) => {
    try {
        const families = await Family.findAll();
        res.json(families);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
