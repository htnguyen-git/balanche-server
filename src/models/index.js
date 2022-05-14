const sequelize = require('./config');

const db = {};
db.Sequelize = sequelize;
db.sequelize = sequelize;

db.rolesContext = require('./roles.model');
db.usersContext = require('./user.model');
db.userRolesContext = require('./userRoles.model');
db.questContext = require('./quest.model');

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db."); 
    require('../seed/index').seedAll(); // use for seed data
});


module.exports = db;