const { userRolesContext } = require('../models/index');

const seed = () => {
    userRolesContext.bulkCreate([
        {
            userId: 1,
            roleId: 1
        },
        {
            userId: 2,
            roleId: 2
        },
        {
            userId: 3,
            roleId: 1
        },
        {
            userId: 4,
            roleId: 1
        },
        {
            userId: 5,
            roleId: 1
        }
    ]).then(() => console.log("seed userRoles complete"))
};
module.exports = { seed };
