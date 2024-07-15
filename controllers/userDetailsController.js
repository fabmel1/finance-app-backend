const { UserDetail, User } = require('../models');

exports.createUserDetail = async (req, res) => {
    try {
        const { id_user, user_name, age, id_family, relationship } = req.body;
        const user = await User.findByPk(id_user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userDetail = await UserDetail.create({ id_user, user_name, age, id_family, relationship });
        res.status(201).json(userDetail);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const userDetails = await UserDetail.findAll();
        res.json(userDetails);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
