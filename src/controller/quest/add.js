const { sequelize } = require('../../models/index');
const { getCurrentDate } = require('../../utilities/date');
const { RECORD_INSERTED, ERROR_WHEN_ADD_QUEST } = require('./msg');

const add = async (req, res) => {
    const addQuestForm = getInfoFromRequest(req)
    try {
        const records = await executeQuery(addQuestForm);
        return res.status(201).json({ message: records.length + " " + RECORD_INSERTED });
    } catch (error) {
        return res.status(500).json({ message: error.toString() || ERROR_WHEN_ADD_QUEST });
    }
};

const getInfoFromRequest = (req) => {
    const userId = req.userId;
    const quests = req.body.quests;
    return { userId, quests };
};

const executeQuery = async ({ userId, quests }) => {
    const queryStr = 'INSERT INTO "quests" '
        + ' ("id","userId","title","group","startTime","endTime","place","howToComPlete","completedAt","deletedAt","createdAt","updatedAt") '
        + ' VALUES'
        + quests.map(quest => {
            return `( DEFAULT, :userId, '${quest.title}','${quest.group}', '${quest.startTime}', '${quest.endTime}', '${quest.place}', '${quest.howToComPlete}', NULL, NULL, :currentDate, :currentDate)`
        })
        + ' RETURNING "id"'
        + ';';
    const [results, records] = await sequelize.query(queryStr, {
        replacements: {
            userId: userId,
            currentDate: getCurrentDate()
        }
    });
    return results;
};

module.exports = add;
