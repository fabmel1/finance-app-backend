const { ThirdParty } = require('../models');

exports.createThirdParties = async (req, res) => {
    try {
        let thirdParties = req.body;

        // Verificar si es un array o un objeto único
        if (!Array.isArray(thirdParties)) {
            thirdParties = [thirdParties];
        }

        const newThirdParties = await ThirdParty.bulkCreate(thirdParties);
        res.status(201).json(newThirdParties);
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

exports.deleteThirdParty = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ThirdParty.destroy({
            where: { id_third_party: id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'ThirdParty not found' });
        }

        res.status(204).json({ message: 'ThirdParty deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteThirdParties = async (req, res) => {
    try {
        const { ids } = req.body; // ids should be an array of third party IDs
        const deleted = await ThirdParty.destroy({
            where: {
                id_third_party: ids
            }
        });

        res.status(204).json({ message: 'ThirdParties deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateThirdParty = async (req, res) => {
    try {
        const { id } = req.params;
        const { global_business_identifier, third_party_name, third_party_description } = req.body;

        const [updated] = await ThirdParty.update({
            global_business_identifier,
            third_party_name,
            third_party_description
        }, {
            where: { id_third_party: id }
        });

        if (!updated) {
            return res.status(404).json({ error: 'ThirdParty not found' });
        }

        const updatedThirdParty = await ThirdParty.findOne({ where: { id_third_party: id } });
        res.status(200).json(updatedThirdParty);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
