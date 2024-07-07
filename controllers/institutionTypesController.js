const { InstitutionType } = require('../models');

exports.createInstitutionType = async (req, res) => {
    try {
        const { institution_type_name } = req.body;
        const institutionType = await InstitutionType.create({ institution_type_name });
        res.status(201).json(institutionType);
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
