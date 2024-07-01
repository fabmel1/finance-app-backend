const { Budget } = require('../models');

exports.createBudget = async (req, res) => {
    try {
        const { budget_name } = req.body;
        const budget = await Budget.create({ budget_name });
        res.status(201).json(budget);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.findAll();
        res.json(budgets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
