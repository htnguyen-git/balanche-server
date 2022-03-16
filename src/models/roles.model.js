const sequelize = require('./config');
const { Sequelize } = require('sequelize');

const Roles = sequelize.define("roles", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING
    },
    deletedAt: {
        type: Sequelize.DATE
    }
})
module.exports = Roles;