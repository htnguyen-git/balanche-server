const { sequelize } = require('../../models/index')
const { GETA_ALL_ERROR } = require('./message')

const getAll = async (req, res) => {
    try {
        const data = await executeQuery();
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ message: error.toString() || GETA_ALL_ERROR })
    }
}

// const getInfoFromRequest = (req) => {

// }

const executeQuery = async () => {
    const queryStr = 'SELECT'
        + ' "id", "userId","roleId", "createdAt", "updatedAt" '
        + ' FROM "userRoles"'
        + ' WHERE "deletedAt" IS NULL';
    const [results, metadata] = await sequelize.query(queryStr);
    return results;
}

module.exports = getAll;