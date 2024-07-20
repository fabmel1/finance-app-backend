const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticate = require('../middlewares/auth'); // Asegúrate de tener autenticación para esta ruta

// Ruta para truncar cualquier tabla
router.delete('/truncate/:tableName', authenticate, adminController.truncateTable);
// Ruta para resetear las secuencias de cualquier tabla
router.delete('/reset-sequence/:tableName', authenticate, adminController.resetSequence);

module.exports = router;
