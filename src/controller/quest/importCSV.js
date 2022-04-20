const { sequelize } = require('../../models/index');
const { IMPORT_SUCCESS, IMPORT_FAIL, IMPORT_ERROR } = require('./msg');
const { csvToJson } = require('../../utilities/jsonCSVConverter');
const { getCurrentDate } = require('../../utilities/date');

const importCSV = async (req, res) => {
    try {
        const reqInfo = getInfoFromRequest(req);
        const result = await executeQuery(reqInfo);
        return result.length > 0 ?
            res.status(201).json({ message: `${result.length} ${IMPORT_SUCCESS}` })
            : res.status(409).json({ message: IMPORT_FAIL })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || IMPORT_ERROR })
    }
};

const getInfoFromRequest = (req) => {
    const buffer = req.file.buffer;
    const csv = buffer.toString();
    const quests = csvToJson(csv);
    const userId = req.userId;
    return { userId, quests };
};

const executeQuery = async ({ userId, quests }) => {
    if (quests.length === 0) { return [] };
    const queryStr = 'INSERT INTO "quests" '
        + ' ("id","userId","title","group","startTime","endTime","place","howToComPlete","completedAt","deletedAt","createdAt","updatedAt") '
        + ' VALUES'
        + quests.map(quest => {
            return `( DEFAULT, :userId, '${quest.title}','${quest.group}', '${quest.startTime}', '${quest.endTime}', '${quest.place}', '${quest.howToComPlete}', NULL , NULL, :currentDate, :currentDate)`
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


module.exports = importCSV;