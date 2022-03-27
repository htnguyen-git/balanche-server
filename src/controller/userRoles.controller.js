const { sequelize } = require('../models/index');
const { getCurrentDate } = require('../utilities/date');

const getAll = async (req, res) => {
    console.log("getall")
    const queryStr = 'SELECT'
        + ' "id", "userId","roleId", "createdAt", "updatedAt" '
        + ' FROM "userRoles"'
        + ' WHERE "deletedAt" IS NULL';
    try {
        const [results, metadata] = await sequelize.query(queryStr);
        res.status(200).json({ results: results })
    } catch (error) {
        res.status(500).json({ message: error.toString() || "Some error occured when get userRoles" })
    }

};

const update = async (req, res) => {
    const userId = req.params.id;
    const roles = req.body.roles;
    const queryStr = 'BEGIN;'
        + ' UPDATE "userRoles"'
        + ' SET "deletedAt" = :currentDate'
        + ' WHERE "userId"=:userId;'
        + ' INSERT INTO "userRoles"'
        + ' ("userId", "roleId","createdAt","updatedAt","deletedAt")'
        + ' VALUES'
        + roles.map(roleId => `(:userId,${roleId}, :currentDate, :currentDate, NULL )`)
        + ' ;'
        + 'COMMIT;';
    try {
        const [results, metadata] = await sequelize.query(queryStr, {
            replacements: {
                userId: userId,
                currentDate: getCurrentDate()
            }
        })
        res.status(200).json(metadata)
    } catch (error) {
        res.status(500).json({ message: error.toString() || "Some error occured when update userRoles" })
    }
}

module.exports = {
    getAll,
    update
}