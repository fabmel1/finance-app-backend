const { Category } = require('../models');

exports.createCategory = async (req, res) => {
    try {
        const { category_name, system_default } = req.body;
        const category = await Category.create({ category_name, system_default });
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
