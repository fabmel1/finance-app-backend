const { BudgetDetail, Budget, Subcategory } = require('../models');

exports.createBudgetDetails = async (req, res) => {
    try {
        let budgetDetails = req.body;

        // Verificar si es un array o un objeto único
        if (!Array.isArray(budgetDetails)) {
            budgetDetails = [budgetDetails];
        }

        // Verificar si todos los budgets y subcategories existen
        const budgetIds = budgetDetails.map(detail => detail.id_budget);
        const subcategoryIds = budgetDetails.map(detail => detail.id_subcategory);

        const budgets = await Budget.findAll({
            where: {
                id_budget: budgetIds
            }
        });

        const subcategories = await Subcategory.findAll({
            where: {
                id_subcategory: subcategoryIds
            }
        });

        if (budgets.length !== new Set(budgetIds).size ||
            subcategories.length !== new Set(subcategoryIds).size) {
            return res.status(404).json({ error: 'One or more required entities not found' });
        }

        const newBudgetDetails = await BudgetDetail.bulkCreate(budgetDetails);
        res.status(201).json(newBudgetDetails);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getBudgetDetails = async (req, res) => {
    try {
        const budgetDetails = await BudgetDetail.findAll({
            include: [Budget, Subcategory]
        });
        res.json(budgetDetails);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBudgetDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await BudgetDetail.destroy({
            where: { id_budget_detail: id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'BudgetDetail not found' });
        }

        res.status(204).json({ message: 'BudgetDetail deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBudgetDetails = async (req, res) => {
    try {
        const { ids } = req.body; // ids should be an array of budget detail IDs
        const deleted = await BudgetDetail.destroy({
            where: {
                id_budget_detail: ids
            }
        });

        res.status(204).json({ message: 'BudgetDetails deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateBudgetDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_budget, id_subcategory, budget_value, budget_detail_desc } = req.body;

        // Verificar si el budget y la subcategory existen
        const budget = await Budget.findByPk(id_budget);
        const subcategory = await Subcategory.findByPk(id_subcategory);

        if (!budget || !subcategory) {
            return res.status(404).json({ error: 'Budget or Subcategory not found' });
        }

        const [updated] = await BudgetDetail.update({
            id_budget,
            id_subcategory,
            budget_value,
            budget_detail_desc
        }, {
            where: { id_budget_detail: id }
        });

        if (!updated) {
            return res.status(404).json({ error: 'BudgetDetail not found' });
        }

        const updatedBudgetDetail = await BudgetDetail.findOne({ where: { id_budget_detail: id } });
        res.status(200).json(updatedBudgetDetail);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
