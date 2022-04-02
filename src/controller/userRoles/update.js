const { sequelize } = require('../../models/index');
const { UPDATE_SUCCESS, UPDATE_FAIL, UPDATE_ERROR } = require('./message');
const { getCurrentDate } = require('../../utilities/date');

const update = async (req, res) => {
    try {
        const updateForm = getInfoFromRequest(req);
        const isUpdateSuccessfully = await executeQuery(updateForm);
        return isUpdateSuccessfully
            ? res.status(200).json({ message: UPDATE_SUCCESS })
            : res.status(409).json({ message: UPDATE_FAIL })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || UPDATE_ERROR })
    }
}

const getInfoFromRequest = (req) => {
    const userId = req.params.id;
    const roles = req.body.roles;
    return { userId, roles }
}

const executeQuery = async ({ userId, roles = [] }) => {

    const queryDel = roles.length > 0
        ? ' UPDATE "userRoles"'
        + ' SET "deletedAt" = :currentDate'
        + ' WHERE "userId"=:userId;'
        : '';
    const queryInsert = roles.length > 0
        ? ' INSERT INTO "userRoles"'
        + ' ("userId", "roleId","createdAt","updatedAt","deletedAt")'
        + ' VALUES'
        + roles.map(role => {
            return `(:userId,${role.id}, :currentDate, :currentDate, NULL )`
        })
        + ' RETURNING "id";'
        : '';

    const queryStr = 'BEGIN;'
        + queryDel
        + queryInsert
        + ' COMMIT;';
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            userId: userId,
            currentDate: getCurrentDate()
        }
    })
    return results.length > 0;
}

module.exports = update;