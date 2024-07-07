const express = require('express');
const router = express.Router();
const subcategoriesController = require('../controllers/subcategoriesController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, subcategoriesController.createSubcategory);
router.get('/', authenticate, subcategoriesController.getSubcategories);

module.exports = router;
