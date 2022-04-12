const { sequelize } = require('../../models/index');
const { ACTIVATE_SUCCESS, ACTIVATE_ERROR, ACTIVATE_FAIL } = require('./message')

const activate = async (req, res) => {
    try {
        const activateForm = getInfoFromRequest(req);
        const isActivateSuccessfully = await executeQuery(activateForm);
        return isActivateSuccessfully
            ? res.status(200).json({ message: ACTIVATE_SUCCESS })
            : res.status(409).json({ message: ACTIVATE_FAIL + activateForm.id })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || ACTIVATE_ERROR })
    }
}

const getInfoFromRequest = (req) => {
    const ids = req.body.ids;
    return { ids };
}

const executeQuery = async ({ ids }) => {
    const queryStr = 'UPDATE "users"'
        + ' SET "isActivate" = :isActivate'
        + ' WHERE "id" IN (:ids)'
        + ' AND "deletedAt" IS NULL'
        + ' RETURNING "id"'
        ;
    const [result, metadata] = await sequelize.query(queryStr, {
        replacements: {
            ids: ids,
            isActivate: 1
        }
    })
    const isActivateSuccessfully = result.length > 0;
    return isActivateSuccessfully;
}

module.exports = activate;