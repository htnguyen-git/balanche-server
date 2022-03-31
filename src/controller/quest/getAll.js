const { sequelize } = require('../../models/index');
const { ERROR_WHEN_GET_ALL_USER } = require('./msg');

const getAll = async (req, res) => {
    try {
        const results = await executeQuery();
        res.status(200).json({ quests: results })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || ERROR_WHEN_GET_ALL_USER })
    }
};
const executeQuery = async () => {
    const queryStr = 'SELECT * FROM "quests"'
        + ' WHERE "deletedAt" IS NULL'
        ;
    const [results, metadata] = await sequelize.query(queryStr);
    return results;
};
module.exports = getAll;