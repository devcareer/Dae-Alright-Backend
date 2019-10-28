const db = require('../src/database/models/index');

( async () => await db.sequelize.sync())();
