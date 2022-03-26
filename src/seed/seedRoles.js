const { rolesContext } = require('../models/index');

const seed = () => {
    rolesContext.bulkCreate([
        { name: "user" },
        { name: "admin" },
        { name: "moderator" },
    ]).then(() => console.log("seed Roles complete"))
};
module.exports = { seed };
