const sequelize = require('./config');
const { Sequelize } = require('sequelize');


const UserRoles = sequelize.define("userRoles", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.INTEGER,
    },
    roleId: {
        type: Sequelize.INTEGER,
    },
    deletedAt: {
        type: Sequelize.DATE
    }

})
module.exports = UserRoles;
