const { sequelize } = require('../../models/index');

const statitisRoleUser = async (req, res) => {
    try {
        const response = await executeQuery();
        const isStatitisSuccesfull = response.length > 0;
        return isStatitisSuccesfull
            ? res.status(200).json(response)
            : res.status(400).json({ message: STATITIS_FAIL })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || STATITIS_ERROR })
    }
}

// const getInfoFromRequest = (req) => {

// }

const executeQuery = async () => {
    const queryStr = 'SELECT array_agg("userId") AS userIds, "roles"."name"'
        + ' FROM "userRoles"'
        + ' INNER JOIN "users" ON "userRoles"."userId" = "users"."id"'
        + ' INNER JOIN "roles" ON "userRoles"."roleId" = "roles"."id"'
        + ' WHERE "users"."deletedAt" IS NULL'
        + ' AND "userRoles"."deletedAt" IS NULL'
        + ' AND "roles"."deletedAt" IS NULL'
        + ' GROUP BY "roles"."id"'
        ;
    const [result, metadata] = await sequelize.query(queryStr);

    return result;
}

module.exports = statitisRoleUser;