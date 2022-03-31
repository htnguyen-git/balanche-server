const { sequelize } = require('../../models/index');
const { getCurrentDate } = require('../../utilities/date');
const { REMOVE_SUCCESS, REMOVE_FAIL, ERROR_WHEN_REMOVE } = require('./msg');

const remove = async (req, res) => {
    try {
        const removeInfo = getInfoFromRequest(req);
        const isRemoveSuccess = executeQuery(removeInfo);
        return isRemoveSuccess
            ? res.status(200).json({ message: `${REMOVE_SUCCESS} ${req.params.id} ` })
            : res.status(409).json({ message: `${REMOVE_FAIL} ${req.params.id}` })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || ERROR_WHEN_REMOVE })
    }
};

const getInfoFromRequest = (req) => {
    const id = req.params.id;
    return { id };
};

const executeQuery = async ({ id }) => {
    const queryStr = 'UPDATE "quests" '
        + ' SET "deletedAt" =:deletedAt'
        + ' WHERE "id"= :id'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            id: id,
            deletedAt: getCurrentDate(),
        }
    })
    const isUpdateSuccess = metadata.rowCount === 1;
    return isUpdateSuccess;
};

module.exports = remove;
