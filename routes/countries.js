const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countriesController');
const authenticate = require('../middlewares/auth'); 

router.post('/', authenticate, countryController.createCountry);
router.get('/', authenticate, countryController.getCountries);

module.exports = router;
