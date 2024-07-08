const { Goal, Currency } = require('../models');

exports.createGoal = async (req, res) => {
    try {
        const { goal_name, goal_description, goal_amount, id_currency } = req.body;
        const currency = await Currency.findByPk(id_currency);

        if (!currency) {
            return res.status(404).json({ error: 'Currency not found' });
        }

        const goal = await Goal.create({
            goal_name,
            goal_description,
            goal_amount,
            id_currency
        });

        res.status(201).json(goal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.findAll({
            include: [Currency]
        });
        res.json(goals);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
