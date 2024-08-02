const express = require('express');
const router = express.Router();
const thirdPartiesController = require('../controllers/thirdPartiesController');
const authenticate = require('../middlewares/auth'); 

router.post('/', authenticate, thirdPartiesController.createThirdParties);
router.get('/', authenticate, thirdPartiesController.getThirdParties);
router.delete('/:id', authenticate, thirdPartiesController.deleteThirdParty);
router.delete('/', authenticate, thirdPartiesController.deleteThirdParties);
router.put('/:id', authenticate, thirdPartiesController.updateThirdParty);

module.exports = router;
