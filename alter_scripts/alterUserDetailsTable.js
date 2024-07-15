const sequelize = require('../config/database'); // Ajusta la ruta según tu estructura de archivos

async function alterTable() {
    try {
        await sequelize.query(`
            ALTER TABLE UserDetails ADD COLUMN id_family INTEGER NOT NULL DEFAULT 1;
        `);
        await sequelize.query(`
            ALTER TABLE UserDetails ADD COLUMN relationship VARCHAR(255) NOT NULL DEFAULT 'Main';
        `);
        console.log("Columns added successfully.");
    } catch (error) {
        console.error("Error adding columns:", error);
    } finally {
        await sequelize.close();
    }
}

alterTable();
