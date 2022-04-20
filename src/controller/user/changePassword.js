const { sequelize } = require('../../models/index');
const hashProvider = require('../../utilities/hashProvider')
const { CHANGE_PWD_SUCCESS, CHANGE_PWD_FAIL, CHANGE_PWD_ERR, PASSWORD_WRONG } = require('./message')

const changePassword = async (req, res) => {
    try {
        const changePasswordForm = getInfoFromRequest(req);
        const isFormValid = validateForm(changePasswordForm);
        if (!isFormValid) {
            return res.status(400).json({ message: PASSWORD_WRONG })
        }
        const isValidUser = await queryCheckUser(changePasswordForm)
        if (!isValidUser) {
            return res.status(409).json({ message: PASSWORD_WRONG })
        }
        const results = await executeQuery(changePasswordForm);
        const isUpdateSuccessfully = results.length > 0;
        return isUpdateSuccessfully
            ? res.status(200).json({ message: CHANGE_PWD_SUCCESS })
            : res.status(409).json({ message: CHANGE_PWD_FAIL })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || CHANGE_PWD_ERR })
    }
}

const getInfoFromRequest = (req) => {
    const id = req.userId;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    return { id, oldPassword, newPassword, confirmPassword }
}

const validateForm = ({ oldPassword, newPassword, confirmPassword }) => {
    return oldPassword !== newPassword
        && newPassword === confirmPassword
}

const queryCheckUser = async ({ id, oldPassword }) => {
    const queryStr = ' SELECT * FROM "users" WHERE "id"=:id AND "isActivate" =1 LIMIT 1'
    const [results, meatadata] = await sequelize.query(queryStr, {
        replacements: {
            id: id
        }
    })
    return results.length > 0 && hashProvider.compare(oldPassword, results[0].password)
}

const executeQuery = async ({ id, newPassword }) => {
    const queryFindUser = ' SELECT * FROM "users" WHERE "id" =:id ';

    const queryStr = 'UPDATE "users"'
        + ' SET password = :newPassword'
        + ' WHERE id = :id'
        + ' AND "isActivate" = 1'
        + ' RETURNING "id"'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            id: id,
            newPassword: hashProvider.hash(newPassword)
        }
    });
    return results;
}

module.exports = changePassword;