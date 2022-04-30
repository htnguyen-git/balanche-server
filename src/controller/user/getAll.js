const { sequelize } = require('../../models/index');
const { GETALL_ERROR } = require('./message');
const getAll = async (req, res) => {
    try {
        const data = await executeQuery();
        return res.status(200).json({ data: data })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || GETALL_ERROR })
    }
}

// const getInfoFromRequest = (req) => {

// }

const executeQuery = async () => {
    const queryStr = 'SELECT DISTINCT "users"."id", "avatar","firstName","lastName","email","isActivate", ARRAY_AGG("roles"."name") as roles'
        + ' FROM "userRoles"'
        + ' INNER JOIN "users" ON "userRoles"."userId" = "users"."id"'
        + ' INNER JOIN "roles" ON "userRoles"."roleId" = "roles"."id"'
        + ' WHERE "users"."deletedAt" IS NULL'
        + ' AND "userRoles"."deletedAt" IS NULL'
        + ' AND "roles"."deletedAt" IS NULL'
        + ' GROUP BY "users"."id"'
        ;
    const [result, metadata] = await sequelize.query(queryStr);

    return result;
}

module.exports = getAll;