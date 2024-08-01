const { Goal, Currency } = require('../models');

exports.createGoals = async (req, res) => {
    try {
        let goals = req.body;

        // Verificar si es un array o un objeto único
        if (!Array.isArray(goals)) {
            goals = [goals];
        }

        // Verificar si todos los tipos de monedas existen
        const currencyIds = goals.map(goal => goal.id_currency);
        const currencies = await Currency.findAll({
            where: {
                id_currency: currencyIds
            }
        });

        if (currencies.length !== new Set(currencyIds).size) {
            return res.status(404).json({ error: 'One or more currencies not found' });
        }

        const newGoals = await Goal.bulkCreate(goals);
        res.status(201).json(newGoals);
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

exports.deleteGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Goal.destroy({
            where: { id_goal: id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        res.status(204).json({ message: 'Goal deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteGoals = async (req, res) => {
    try {
        const { ids } = req.body; // ids should be an array of goal IDs
        const deleted = await Goal.destroy({
            where: {
                id_goal: ids
            }
        });

        res.status(204).json({ message: 'Goals deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const { goal_name, goal_description, goal_amount, goal_progress, completed, id_currency } = req.body;

        // Verificar si la moneda existe
        const currency = await Currency.findByPk(id_currency);
        if (!currency) {
            return res.status(404).json({ error: 'Currency not found' });
        }

        const [updated] = await Goal.update({ goal_name, goal_description, goal_amount, goal_progress, completed, id_currency }, {
            where: { id_goal: id }
        });

        if (!updated) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        const updatedGoal = await Goal.findOne({ where: { id_goal: id } });
        res.status(200).json(updatedGoal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
