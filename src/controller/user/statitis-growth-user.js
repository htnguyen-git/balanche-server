const { sequelize } = require('../../models/index')
const { STATITIS_FAIL, STATITIS_ERROR } = require('./message');

const statitisGrowthUser = async (req, res) => {
    try {

        const response = await executeQuery();
        const isStatitisSuccesfull = response.length > 0;
        return isStatitisSuccesfull
            ? res.status(200).json({ data: response })
            : res.status(400).json({ message: STATITIS_FAIL })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || STATITIS_ERROR })
    }
}


const executeQuery = async () => {
    const queryStr =
        `
        SELECT 
            'Newly user' as "title",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."createdAt") IN ('1') THEN 1 ELSE NULL END) AS "jan",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."createdAt") IN ('2') THEN 1 ELSE NULL END) AS "feb",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."createdAt") IN ('3') THEN 1 ELSE NULL END) AS "mar",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."createdAt") IN ('4') THEN 1 ELSE NULL END) AS "apr",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."createdAt") IN ('5') THEN 1 ELSE NULL END) AS "may",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."createdAt") IN ('6') THEN 1 ELSE NULL END) AS "jun",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."createdAt") IN ('7') THEN 1 ELSE NULL END) AS "jul",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."createdAt") IN ('8') THEN 1 ELSE NULL END) AS "aug",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."createdAt") IN ('9') THEN 1 ELSE NULL END) AS "sep",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."createdAt") IN ('10') THEN 1 ELSE NULL END) AS "oct",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."createdAt") IN ('11') THEN 1 ELSE NULL END) AS "nov",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."createdAt") IN ('12') THEN 1 ELSE NULL END) AS "dec"
        FROM "users"
        WHERE EXTRACT(YEAR FROM "users"."createdAt")=DATE_PART('year', CURRENT_DATE)
        UNION
        SELECT 
            'Deleted user' as "title",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."deletedAt") IN ('1') THEN 1 ELSE NULL END) AS "jan",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."deletedAt") IN ('2') THEN 1 ELSE NULL END) AS "feb",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."deletedAt") IN ('3') THEN 1 ELSE NULL END) AS "mar",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."deletedAt") IN ('4') THEN 1 ELSE NULL END) AS "apr",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."deletedAt") IN ('5') THEN 1 ELSE NULL END) AS "may",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."deletedAt") IN ('6') THEN 1 ELSE NULL END) AS "jun",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."deletedAt") IN ('7') THEN 1 ELSE NULL END) AS "jul",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."deletedAt") IN ('8') THEN 1 ELSE NULL END) AS "aug",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."deletedAt") IN ('9') THEN 1 ELSE NULL END) AS "sep",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."deletedAt") IN ('10') THEN 1 ELSE NULL END) AS "oct",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."deletedAt") IN ('11') THEN 1 ELSE NULL END) AS "nov",
            COUNT(CASE WHEN EXTRACT(MONTH FROM "users"."deletedAt") IN ('12') THEN 1 ELSE NULL END) AS "dec"
        FROM "users"
        WHERE EXTRACT(YEAR FROM "users"."deletedAt")=DATE_PART('year', CURRENT_DATE)
        `

    const [result, metadata] = await sequelize.query(queryStr)

    return result
}

module.exports = statitisGrowthUser;