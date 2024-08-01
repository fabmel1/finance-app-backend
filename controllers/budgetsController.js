const { Budget, BudgetDetail } = require('../models');

exports.createBudgets = async (req, res) => {
    try {
        let budgets = req.body;

        // Verificar si es un array o un objeto único
        if (!Array.isArray(budgets)) {
            budgets = [budgets];
        }

        const newBudgets = await Budget.bulkCreate(budgets);
        res.status(201).json(newBudgets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.findAll({
            include: [BudgetDetail]
        });
        res.json(budgets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Budget.destroy({
            where: { id_budget: id },
            include: [BudgetDetail] // Esto asegura la eliminación en cascada
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        res.status(204).json({ message: 'Budget deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBudgets = async (req, res) => {
    try {
        const { ids } = req.body; // ids should be an array of budget IDs
        const deleted = await Budget.destroy({
            where: {
                id_budget: ids
            },
            include: [BudgetDetail] // Esto asegura la eliminación en cascada
        });

        res.status(204).json({ message: 'Budgets deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const { budget_name } = req.body;

        const [updated] = await Budget.update({ budget_name }, {
            where: { id_budget: id }
        });

        if (!updated) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        const updatedBudget = await Budget.findOne({ where: { id_budget: id } });
        res.status(200).json(updatedBudget);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
