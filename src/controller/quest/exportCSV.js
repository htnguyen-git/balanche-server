const { sequelize } = require('../../models/index');
const { EXPORT_ERROR } = require('./msg');
const { jsonToCSV } = require('../../utilities/jsonCSVConverter')
const exportCSV = async (req, res) => {
    try {
        const reqInfo = getInfoFromQuery(req);
        const results = await executeQuery(reqInfo);
        const fileContent = jsonToCSV(results);
        res.attachment(reqInfo.fileName);
        res.status(200).send(fileContent);
    } catch (error) {
        return res.status(500).json({ message: error.toString() || EXPORT_ERROR })
    }
};

const getInfoFromQuery = (req) => {
    const userId = req.userId;
    const fileName = req.params.fileName;
    return { userId, fileName };
};

const executeQuery = async ({ userId }) => {
    const queryStr = 'SELECT "title","group","startTime", "endTime", "place", "howToComPlete", "completedAt"'
        + ' FROM "quests"'
        + ' WHERE "deletedAt" IS NULL'
        + ' AND "userId" =:userId'
        + ' AND "completedAt" IS NULL'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            userId: userId
        }
    });
    return results;
};


module.exports = exportCSV;