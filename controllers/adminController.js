const { sequelize } = require('../models');

// Función para vaciar cualquier tabla
exports.truncateTable = async (req, res) => {
    const { tableName } = req.params;
    try {
        await sequelize.query(`DELETE FROM ${tableName}`);
        res.status(204).json({ message: `${tableName} table truncated` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Función para eliminar las secuencias de una tabla
exports.resetSequence = async (req, res) => {
    const { tableName } = req.params;
    try {
        await sequelize.query(`DELETE FROM sqlite_sequence WHERE UPPER(name) = UPPER('${tableName})'`);
        res.status(204).json({ message: `${tableName} sequence reset` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};