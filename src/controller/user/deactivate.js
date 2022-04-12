const { sequelize } = require('../../models/index')
const { DEACTIVATE_SUCCESS, DEACTIVATE_FAIL, DEACTIVATE_ERROR } = require('./message');

const deactivate = async (req, res) => {
    try {
        const deactiveForm = getInfoFromRequest(req);
        const isDeactiveSuccessFully = await executeQuery(deactiveForm);
        return isDeactiveSuccessFully
            ? res.status(200).json({ message: DEACTIVATE_SUCCESS })
            : res.status(409).json({ message: DEACTIVATE_FAIL + deactiveForm.id })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || DEACTIVATE_ERROR })
    }
}

const getInfoFromRequest = (req) => {
    const ids = req.body.ids;
    return { ids }
}

const executeQuery = async ({ ids }) => {
    const queryStr = 'UPDATE "users"'
        + ' SET "isActivate" = :isActivate '
        + ' WHERE "id" IN (:ids) AND "deletedAt" IS NULL'
        + ' RETURNING "id"'
        ;
    const [result, metadata] = await sequelize.query(queryStr, {
        replacements: {
            isActivate: 0,
            ids: ids,
        }
    })
    const isUpdateSuccessFully = result.length > 0;
    return isUpdateSuccessFully;
}

module.exports = deactivate;