module.exports = (sequelize, Sequelize) => {
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
        
    })
    return UserRoles;
}