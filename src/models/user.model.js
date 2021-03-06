const sequelize = require('./config');
const { Sequelize } = require('sequelize');
const MAX_SIZE_UPLOAD_IMAGE = 5 * 1024 * 1024;

const Users = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    avatar: {
        type: Sequelize.STRING(MAX_SIZE_UPLOAD_IMAGE)
    },
    city: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    jobTitle: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    timeZone: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    isActivate: {
        type: Sequelize.INTEGER
    },
    deletedAt: {
        type: Sequelize.DATE
    }
});
module.exports = Users;