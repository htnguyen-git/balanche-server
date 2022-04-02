const { sequelize } = require('../../models/index');
const { REMOVE_SUCCESS, REMOVE_FAIL, REMOVE_ERROR } = require('./message');
const { getCurrentDate } = require('../../utilities/date');

const remove = async (req, res) => {
    try {
        const removeForm = getInfoFromRequest(req);
        const isRemoveSuccess = await executeQuery(removeForm);
        return isRemoveSuccess
            ? res.status(200).json({ message: `${REMOVE_SUCCESS} ${removeForm.id}` })
            : res.status(409).json({ mesage: `${REMOVE_FAIL} ${removeForm.id}` })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || REMOVE_ERROR })
    }
}

const getInfoFromRequest = (req) => {
    const id = req.params.id;
    return { id }
}

const executeQuery = async ({ id }) => {
    const queryStr = 'UPDATE roles '
        + 'SET "deletedAt" = :deletedAt'
        + ' WHERE id=:id;'
        ;

    const [result, metadata] = await sequelize.query(queryStr, {
        replacements: { deletedAt: getCurrentDate(), id: id }
    })
    return metadata.rowCount === 1;
}

module.exports = remove;