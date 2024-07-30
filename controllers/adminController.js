const { sequelize } = require('../models');

// Función para verificar si una columna existe en una tabla
const columnExists = async (tableName, columnName) => {
    const result = await sequelize.query(`
        PRAGMA table_info(${tableName});
    `);
    return result[0].some(column => column.name === columnName);
};

// Función para vaciar cualquier tabla, excepto registros del sistema si existe el campo system_default
exports.truncateTable = async (req, res) => {
    const { tableName } = req.params;
    try {
        const hasSystemDefault = await columnExists(tableName, 'system_default');

        if (hasSystemDefault) {
            await sequelize.query(`DELETE FROM ${tableName} WHERE system_default = 0`);
        } else {
            await sequelize.query(`DELETE FROM ${tableName}`);
        }

        res.status(204).json({ message: `${tableName} table truncated` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Función para resetear las secuencias de una tabla
exports.resetSequence = async (req, res) => {
    const { tableName } = req.params;
    try {
        await sequelize.query(`DELETE FROM sqlite_sequence WHERE name = '${tableName}'`);
        res.status(204).json({ message: `${tableName} sequence reset` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
