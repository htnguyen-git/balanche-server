const { sequelize } = require('../../models/index')
const { GETALL_ERROR } = require('./message')
const getall = async (req, res) => {
    try {
        const data = executeQuery();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.toString() || GETALL_ERROR })
    }
}
// const getInfoFromRequest = (req) => {

// }

const executeQuery = async () => {
    const queryStr = `SELECT * FROM roles WHERE "deletedAt" is NULL;`;
    const data = await sequelize.query(queryStr, { type: QueryTypes.SELECT });
    return result
}

module.exports = getall;