const sequelize = require('./config');

const db = {};
db.Sequelize = sequelize;
db.sequelize = sequelize;

db.rolesContext = require('./roles.model');
db.usersContext = require('./user.model');
db.userRolesContext = require('./userRoles.model');

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });
module.exports = db;

