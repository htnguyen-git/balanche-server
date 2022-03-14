const Sequelize = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const db = {};
db.Sequelize = sequelize;
db.sequelize = sequelize;
db.roles = require('./roles.model')(sequelize,Sequelize);
module.exports = db;

