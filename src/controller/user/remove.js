const { sequelize } = require('../../models/index');
const { REMOVE_SUCCESS, REMOVE_FAIL, REMOVE_ERROR } = require('./message');
const { getCurrentDate } = require("../../utilities/date")

const remove = async (req, res) => {
    console.log("remove")
    try {
        const removeForm = getInfoFromRequest(req);
        const isRemoveSuccess = await executeQuery(removeForm);
        return isRemoveSuccess
            ? res.status(200).json({ message: REMOVE_SUCCESS })
            : res.status(409).json({ message: REMOVE_FAIL + removeForm.id })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || REMOVE_ERROR })
    }
}

const getInfoFromRequest = (req) => {
    const id = req.params.id;
    return { id }
}

const executeQuery = async ({ id }) => {
    const queryStr = 'UPDATE "users"'
        + ' SET "deletedAt" = :currentDate '
        + ' WHERE "id"=:id AND "deletedAt" IS NULL'
        ;
    const [result, metadata] = await sequelize.query(queryStr, {
        replacements: {
            currentDate: getCurrentDate(),
            id: id,
        }
    })
    const idDeletedSuccessfully = metadata.rowCount === 1;
    return idDeletedSuccessfully;
}

module.exports = remove;