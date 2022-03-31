const { sequelize } = require('../../models/index');
const { getCurrentDate } = require('../../utilities/date');
const { RECORD_INSERTED, ERROR_WHEN_ADD_QUEST } = require('./msg');

const add = async (req, res) => {
    const addQuestForm = getInfoFromRequest(req)
    try {
        const records = await executeQuery(addQuestForm);
        return res.status(201).json({ message: records + " " + RECORD_INSERTED });
    } catch (error) {
        return res.status(500).json({ message: error.toString() || ERROR_WHEN_ADD_QUEST });
    }
};

const getInfoFromRequest = (req) => {
    const quests = req.body.quests;
    return quests;
};

const executeQuery = async (quests) => {
    const queryStr = 'INSERT INTO "quests" '
        + ' ("id","title","group","startTime","endTime","place","howToComPlete","completedAt","deletedAt","createdAt","updatedAt") '
        + ' VALUES'
        + quests.map(quest => {
            return `( DEFAULT, '${quest.title}','${quest.group}', '${quest.startTime}', '${quest.endTime}', '${quest.place}', '${quest.howToComPlete}', :currentDate, NULL, :currentDate, :currentDate)`
        })
        + ';';
    const [results, records] = await sequelize.query(queryStr, {
        replacements: {
            currentDate: getCurrentDate()
        }
    });
    return records;
};

module.exports = add;
