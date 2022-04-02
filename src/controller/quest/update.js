const { sequelize } = require('../../models/index');
const { getCurrentDate } = require('../../utilities/date');
const { ERROR_WHEN_UPDATE_QUEST, UPDATE_SUCCESS, UPDATE_FAIL } = require('./msg');

const update = async (req, res) => {
    try {
        const updatedQuestForm = getInfoFromRequest(req);
        const metadata = await executeQuery(updatedQuestForm);
        const isUpdateSuccess = metadata && metadata.rowCount === 1;
        return isUpdateSuccess
            ? res.status(200).json({ message: UPDATE_SUCCESS })
            : res.status(409).json({ message: UPDATE_FAIL })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || ERROR_WHEN_UPDATE_QUEST })
    }
};

const getInfoFromRequest = (req) => {
    const userId = req.userId;
    const id = req.params.id;
    const title = req.body.title;
    const group = req.body.group;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const place = req.body.place;
    const howToComPlete = req.body.howToComPlete;
    const completedAt = req.body.completedAt;
    return { id, userId, title, group, startTime, endTime, place, howToComPlete, completedAt };
};
const executeQuery = async ({ id, userId, title, group, startTime, endTime, place, howToComPlete, completedAt }) => {
    const queryStr = 'UPDATE "quests"'
        + ' SET  '
        + '     "title" = :title,'
        + '     "group" = :group,'
        + '     "startTime" = :startTime,'
        + '     "endTime" = :endTime,'
        + '     "place" = :place,'
        + '     "howToComPlete" = :howToComPlete,'
        + '     "completedAt" = :completedAt,'
        + '     "deletedAt" = :deletedAt,'
        + '     "updatedAt" = :currentDate'
        + ' WHERE "id" =:id'
        + ' AND "userId" =:userId'
        + ' AND "deletedAt" IS NULL'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            title: title,
            group: group,
            startTime: startTime,
            endTime: endTime,
            place: place,
            howToComPlete: howToComPlete,
            completedAt: completedAt,
            deletedAt: null,
            currentDate: getCurrentDate(),
            id: id,
            userId: userId
        }
    });
    return metadata;
}

module.exports = update;