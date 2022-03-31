const { sequelize } = require('../../models/index');
const { getCurrentDate } = require('../../utilities/date');
const { MARK_DONE_SUCCESS, MARK_DONE_FAIL, MARK_DONE_ERROR } = require('./msg')

const markDone = async (req, res) => {
    console.log("mark done")
    try {
        const markDoneInfo = getInfoFromRequest(req);
        const isMarkDoneComplete = executeQuery(markDoneInfo);
        return isMarkDoneComplete
            ? res.status(200).json({ message: `${MARK_DONE_SUCCESS} ${markDoneInfo.id}` })
            : res.status(409).json({ mesasge: `${MARK_DONE_FAIL} ${markDoneInfo.id}` })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || MARK_DONE_ERROR })
    }
};

const getInfoFromRequest = (req) => {
    const id = req.params.id;
    return { id };
};

const executeQuery = async ({ id }) => {
    const queryStr = 'UPDATE "quests"'
        + ' SET "completedAt" =:completedAt'
        + ' WHERE "id"=:id'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            id: id,
            completedAt: getCurrentDate()
        }
    });
    return metadata.rowCount === 1;
};

module.exports = markDone;