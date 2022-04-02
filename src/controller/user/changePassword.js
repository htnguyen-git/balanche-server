const { sequelize } = require('../../models/index');
const hashProvider = require('../../utilities/hashProvider')
const { CHANGE_PWD_SUCCESS, CHANGE_PWD_FAIL, CHANGE_PWD_ERR } = require('./message')

const changePassword = async (req, res) => {
    try {
        const changePasswordForm = getInfoFromRequest(req);
        const isUpdateSuccessfully = await executeQuery(changePasswordForm);
        return isUpdateSuccessfully
            ? res.status(200).json({ message: CHANGE_PWD_SUCCESS })
            : res.status(409).json({ message: CHANGE_PWD_FAIL })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || CHANGE_PWD_ERR })
    }
}

const getInfoFromRequest = (req) => {
    const id = req.userId;
    const newPassword = hashProvider.hash(req.body.newPassword);
    return { id, newPassword }
}

const executeQuery = async ({ id, newPassword }) => {
    const queryStr = 'UPDATE "users"'
        + ' SET password = :newPassword'
        + ' WHERE id = :id'
        + ' AND "isActivate" = 1'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            id: id,
            newPassword: newPassword
        }
    });
    return metadata.rowCount === 1;
}

module.exports = changePassword;