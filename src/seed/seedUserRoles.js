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
        }
    ]).then(() => console.log("seed userRoles complete"))
};
module.exports = { seed };
