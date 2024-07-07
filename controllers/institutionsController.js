const { Institution, InstitutionType } = require('../models');

exports.createInstitution = async (req, res) => {
    try {
        const { institution_name, id_institution_type } = req.body;
        const institutionType = await InstitutionType.findByPk(id_institution_type);

        if (!institutionType) {
            return res.status(404).json({ error: 'Institution type not found' });
        }

        const institution = await Institution.create({
            institution_name,
            id_institution_type
        });

        res.status(201).json(institution);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getInstitutions = async (req, res) => {
    try {
        const institutions = await Institution.findAll({
            include: [InstitutionType]
        });
        res.json(institutions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
