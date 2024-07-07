const { BudgetDetail, Budget, Subcategory } = require('../models');

exports.createBudgetDetail = async (req, res) => {
    try {
        const { id_budget, id_subcategory, budget_value, budget_detail_desc } = req.body;
        const budget = await Budget.findByPk(id_budget);
        const subcategory = await Subcategory.findByPk(id_subcategory);

        if (!budget || !subcategory) {
            return res.status(404).json({ error: 'Budget or Subcategory not found' });
        }

        const budgetDetail = await BudgetDetail.create({
            id_budget,
            id_subcategory,
            budget_value,
            budget_detail_desc
        });

        res.status(201).json(budgetDetail);
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
