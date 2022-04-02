const { sequelize } = require('../../models/index');
const { ERROR_WHEN_GET_ALL_USER } = require('./msg');

const getAll = async (req, res) => {
    try {
        const getAllForm = getInfoFromQuery(req);
        const results = await executeQuery(getAllForm);
        res.status(200).json({ quests: results })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || ERROR_WHEN_GET_ALL_USER })
    }
};
const getInfoFromQuery = (req) => {
    const userId = req.userId;
    return { userId };
}
const executeQuery = async ({ userId }) => {
    const queryStr = 'SELECT * FROM "quests"'
        + ' WHERE "deletedAt" IS NULL'
        + ' AND "userId" =:userId'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            userId: userId
        }
    });
    return results;
};
module.exports = getAll;