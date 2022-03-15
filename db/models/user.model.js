module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.STRING
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
        firstName: {
            type: Sequelize.STRING
        },
        lasName: {
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
        updatedAt: {
            type: Sequelize.DATE
        },
        deletedAt: {
            type: Sequelize.DATE
        }
    })
    return Users;
}