const { Institution, InstitutionType } = require('../models');


exports.createInstitutions = async (req, res) => {
    try {
        let institutions = req.body;

        // Si institutions no es un array, convertirlo en uno
        if (!Array.isArray(institutions)) {
            institutions = [institutions];
        }

        // Verificar si todos los tipos de instituciones existen
        const institutionTypeIds = institutions.map(inst => inst.id_institution_type);
        const institutionTypes = await InstitutionType.findAll({
            where: {
                id_institution_type: institutionTypeIds
            }
        });

        if (institutionTypes.length !== new Set(institutionTypeIds).size) {
            return res.status(404).json({ error: 'One or more institution types not found' });
        }

        // Crear las instituciones
        const createdInstitutions = await Institution.bulkCreate(institutions);
        res.status(201).json(createdInstitutions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteInstitution = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Institution.destroy({
            where: { id_institution: id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Institution not found' });
        }

        res.status(204).json({ message: 'Institution deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteInstitutions = async (req, res) => {
    try {
        const { ids } = req.body; // ids should be an array of institution IDs
        const deleted = await Institution.destroy({
            where: {
                id_institution: ids
            }
        });

        res.status(204).json({ message: 'Institutions deleted' });
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
