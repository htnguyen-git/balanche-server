const { sequelize } = require('../models/index');
const jwt = require('jsonwebtoken');
const AUTH_SECRECT_KEY = process.env.AUTH_SECRECT_KEY;

const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json({ message: "No token provided" })
    }
    jwt.verify(token, AUTH_SECRECT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: "Not authorized" })
        }
        req.userId = decode.id;
        next();
    })
};

const isAdmin = async (req, res, next) => {
    const roles = await getRolesFromDatabase(req)
    const hasAdminRole = roles.find(x => x["name"] === "admin")
    if (hasAdminRole) {
        next();
        return;
    } else {
        return res.status(403).json({ message: "Required Admin Role!" })
    }
};

const isNormalUser = async (req, res, next) => {
    const roles = await getRolesFromDatabase(req)
    const hasAdminRole = roles.find(x => x["name"] === "user")
    if (hasAdminRole) {
        next();
        return;
    } else {
        return res.status(403).json({ message: "Required User Role!" })
    }
};

const getRolesFromDatabase = async ({ userId }) => {
    const queryStr = 'SELECT "roles"."name" FROM "userRoles"'
        + ' INNER JOIN "roles" ON "userRoles"."roleId" = "roles"."id"'
        + ' WHERE'
        + '   "userRoles"."deletedAt" IS NULL'
        + '   AND "roles"."deletedAt" IS NULL'
        + ' AND "userRoles"."userId" = :userId'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            userId: userId
        }
    })
    return results;
};

module.exports = {
    verifyToken,
    isAdmin,
    isNormalUser
}