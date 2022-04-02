const { sequelize } = require('../../models/index');
const { ADD_SUCCESS, ADD_ERROR } = require('./message');
const { getCurrentDate } = require('../../utilities/date');

const add = async (req, res) => {
    try {
        const addForm = getInfoFromRequest(req);
        const records = await executeQuery(addForm);
        return res.status(201).json({ message: `${records} ${ADD_SUCCESS}` });
    } catch (error) {
        return res.status(500).json({ message: error.toString() || ADD_ERROR });
    }
}

const getInfoFromRequest = (req) => {
    const roleNames = req.body.roleNames;
    return { roleNames }
}

const executeQuery = async ({ roleNames = [] }) => {
    const queryStr = 'INSERT INTO roles ("name","createdAt","updatedAt")'
        + ' VALUES'
        + roleNames.map(role => {
            return `('${role.name}',:currentDate, :currentDate)`
        })
        + ';'

    const [result, metadata] = await sequelize.query(queryStr,
        {
            replacements: { currentDate: getCurrentDate() },
        }
    )
    return metadata;
}

module.exports = add;