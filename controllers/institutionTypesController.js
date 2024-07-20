const { InstitutionType } = require('../models');

exports.createInstitutionTypes = async (req, res) => {
    try {
        const institutionTypes = req.body;
        const createdInstitutionTypes = await InstitutionType.bulkCreate(institutionTypes);
        res.status(201).json(createdInstitutionTypes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getInstitutionTypes = async (req, res) => {
    try {
        const institutionTypes = await InstitutionType.findAll();
        res.json(institutionTypes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
