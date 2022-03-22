const sequelize = require('./config');
const { Sequelize } = require('sequelize');

const Quests = sequelize.define("quests", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING
    },
    group: {
        type: Sequelize.STRING
    },
    startTime: {
        type: Sequelize.DATE
    },
    endTime: {
        type: Sequelize.DATE
    },
    place: {
        type: Sequelize.STRING
    },
    howToComPlete: {
        type: Sequelize.STRING
    },
    completedAt: {
        type: Sequelize.DATE
    },
    deletedAt: {
        type: Sequelize.DATE
    }
});

module.exports = Quests;