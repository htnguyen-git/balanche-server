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
    }
})
module.exports = Roles;