const { sequelize } = require('../../models/index');
const { GETALL_ERROR } = require('./message');
const getFullInfo = async (req, res) => {
    try {
        const getFullInfoForm = getInfoFromRequest(req)
        const data = await executeQuery(getFullInfoForm);
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ message: error.toString() || GETALL_ERROR })
    }
}

const getInfoFromRequest = (req) => {
    const id = req.userId;
    return { id }
}

const executeQuery = async ({ id }) => {
    const queryStr = 'SELECT "id", "name", "firstName", "lastName","avatar","city", "country", "jobTitle", "email", "timeZone", "phone"'
        + ' FROM "users"'
        + ' WHERE "deletedAt" IS NULL'
        + ' AND "id" = :id'
        ;
    const [result, metadata] = await sequelize.query(queryStr, {
        replacements: {
            id: id
        }
    });
    return result.pop();
}

module.exports = getFullInfo;