const sequelize = require('./config');

const db = {};
db.Sequelize = sequelize;
db.sequelize = sequelize;

db.roles = require('./roles.model');
db.users = require('./user.model');
db.userRoles = require('./userRoles.model');

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});
module.exports = db;

