const { sequelize } = require('../../models/index')
const { STATITIS_FAIL, STATITIS_ERROR } = require('./message');

const statisticalCountUser = async (req, res) => {
    try {
        const countUserForm = getInfoFromRequest(req);
        const response = await executeQuery(countUserForm);
        const isStatitisSuccesfull = response.length > 0;
        return isStatitisSuccesfull
            ? res.status(200).json({ data: response[0] })
            : res.status(400).json({ message: STATITIS_FAIL })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || STATITIS_ERROR })
    }
}

const getInfoFromRequest = (req) => {
    const ids = req.body.ids;
    return { ids }
}

const executeQuery = async ({ ids }) => {
    const queryStr =
        'SELECT'
        + '     COUNT("id") as TOTAL,'
        + '     COUNT(CASE WHEN "deletedAt" is NULL THEN 1 ELSE NULL END) AS IN_USE,'
        + '     COUNT(CASE WHEN "deletedAt" IS NOT NULL THEN 1 ELSE NULL END ) AS IS_REMOVING,'
        + '     COUNT(CASE WHEN ("deletedAt" IS NULL AND "isActivate"=1) THEN 1 ELSE NULL END) AS ACTIVATING,'
        + '     COUNT(CASE WHEN ("deletedAt" IS NULL AND "isActivate" = 0) THEN 1 ELSE NULL END) AS DEACTIVATING'
        + ' FROM "users"'

    const [result, metadata] = await sequelize.query(queryStr)

    return result;
}

module.exports = statisticalCountUser;