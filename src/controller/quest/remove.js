const { sequelize } = require('../../models/index');
const { getCurrentDate } = require('../../utilities/date');
const { REMOVE_SUCCESS, REMOVE_FAIL, ERROR_WHEN_REMOVE } = require('./msg');

const remove = async (req, res) => {
    try {
        const removeInfo = getInfoFromRequest(req);
        const isRemoveSuccess = await executeQuery(removeInfo);
        return isRemoveSuccess
            ? res.status(200).json({ message: `${REMOVE_SUCCESS} ${req.params.id} ` })
            : res.status(409).json({ message: `${REMOVE_FAIL} ${req.params.id}` })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || ERROR_WHEN_REMOVE })
    }
};

const getInfoFromRequest = (req) => {
    const userId = req.userId;
    const id = req.params.id;
    return { id, userId };
};

const executeQuery = async ({ id, userId }) => {
    const queryStr = 'UPDATE "quests" '
        + ' SET "deletedAt" =:deletedAt'
        + ' WHERE "id"= :id'
        + ' AND "userId" =:userId'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            id: id,
            userId: userId,
            deletedAt: getCurrentDate(),
        }
    })
    const isUpdateSuccess = metadata.rowCount === 1;
    return isUpdateSuccess;
};

module.exports = remove;
