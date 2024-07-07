const { Subcategory, Category } = require('../models');

exports.createSubcategory = async (req, res) => {
    try {
        const { subcategory_name, id_category } = req.body;
        const category = await Category.findByPk(id_category);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const subcategory = await Subcategory.create({
            subcategory_name,
            id_category
        });

        res.status(201).json(subcategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.findAll({
            include: [Category]
        });
        res.json(subcategories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
