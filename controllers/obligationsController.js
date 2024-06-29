const { Obligation, User } = require('../models');

exports.createObligation = async (req, res) => {
    try {
        const { name_obligation, due_day, ideal_day, id_subcategory } = req.body;
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const obligation = await Obligation.create({ 
            name_obligation, 
            due_day, 
            ideal_day, 
            id_subcategory, 
            id_user: req.userId 
        });
        res.status(201).json(obligation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getObligations = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const obligations = await Obligation.findAll({ where: { id_user: req.userId } });
        res.json(obligations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
