const { sequelize } = require('../../models/index');
const { getCurrentDate } = require('../../utilities/date');
const { REMOVE_SUCCESS, REMOVE_FAIL, ERROR_WHEN_REMOVE } = require('./msg');

const remove = async (req, res) => {
    try {
        const removeInfo = getInfoFromRequest(req);
        const results = await executeQuery(removeInfo);
        const isRemoveSuccess = results.length > 0;
        return isRemoveSuccess
            ? res.status(200).json({ message: `${REMOVE_SUCCESS} ${results.map(x => x.id)}` })
            : res.status(409).json({ message: `${REMOVE_FAIL} ${removeInfo.ids}` })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || ERROR_WHEN_REMOVE })
    }
};

const getInfoFromRequest = (req) => {
    const userId = req.userId;
    const ids = req.body.ids;
    return { ids, userId };
};

const executeQuery = async ({ ids, userId }) => {
    const queryStr = 'UPDATE "quests" '
        + ' SET "deletedAt" =:deletedAt'
        + ' WHERE "id" IN (:ids)'
        + ' AND "userId" =:userId'
        + ' AND"deletedAt" IS NULL'
        + ' RETURNING "id"'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            ids: ids,
            userId: userId,
            deletedAt: getCurrentDate(),
        }
    })
    return results;
};

module.exports = remove;
