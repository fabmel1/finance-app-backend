const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, categoriesController.createCategory);
router.get('/', authenticate, categoriesController.getCategories);

module.exports = router;
