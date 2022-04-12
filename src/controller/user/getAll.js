const { sequelize } = require('../../models/index');
const { GETALL_ERROR } = require('./message');
const getAll = async (req, res) => {
    try {
        const data = await executeQuery();
        return res.status(200).json({ data: data })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || GETALL_ERROR })
    }
}

// const getInfoFromRequest = (req) => {

// }

const executeQuery = async () => {
    const queryStr = 'SELECT "id", "avatar","firstName","lastName","email","isActivate"'
        + ' FROM "users"'
        + ' WHERE "deletedAt" IS NULL;'
        ;
    const [result, metadata] = await sequelize.query(queryStr);
    return result;
}

module.exports = getAll;