const hashProvider = require('../utilities/hashProvider');
const { sequelize } = require("../models/index");
const jwt = require("jsonwebtoken");
const { getCurrentDate } = require('../utilities/date');
const { hash } = require('bcrypt');

const authConfig = {
    AUTH_SECRECT_KEY: process.env.AUTH_SECRECT_KEY,
    EXPIRED_TIME: 24 * 60 * 60
};
const errMsg = {
    EMAIL_OR_PASSWORD_INVALID: "Email or password is invalid"
};

const signIn = async (req, res) => {
    try {
        const userInfoFromRequest = getUserInfoFromRequest(req);
        const userInfoFromDatabase = await findUserByEmail(userInfoFromRequest);
        const isPasswordCorrect = userInfoFromDatabase && hashProvider.compare(userInfoFromRequest.password, userInfoFromDatabase.password);
        return isPasswordCorrect
            ? res.status(200).json({
                id: userInfoFromDatabase.id,
                username: userInfoFromDatabase.username,
                email: userInfoFromDatabase.email,
                roles: await getRolesFromDatabase(userInfoFromRequest),
                accessToken: jwt.sign({ id: userInfoFromDatabase.id }, authConfig.AUTH_SECRECT_KEY, { expiresIn: authConfig.EXPIRED_TIME })
            })
            : res.status(200).json(
                {
                    message: errMsg.EMAIL_OR_PASSWORD_INVALID,
                    accessToken: null
                }
            )
    } catch (error) {
        return res.status(500).json({ error: error.toString() })
    }
};

const signUp = async (req, res) => {
    try {
        const userInfoFromRequest = getUserInfoFromRequest(req);
        const isAddSucessfully = await checkThenInsertNewUserToDatabase(userInfoFromRequest);
        isAddSucessfully
            ? res.status(200).json({ message: "Register successfully" })
            : res.status(200).json({ message: "Email is already taken" })
    } catch (error) {
        res.status(500).json({ message: error.toString() || "Some error occured when register user" })
    }
};

const getUserInfoFromRequest = (req) => {
    const email = req.body.email;
    const password = req.body.password;
    return { email, password };
};

const findUserByEmail = async ({ email }) => {
    const queryStr = 'SELECT *'
        + ' FROM "users"'
        + ' WHERE "email" =:email'
        + '     AND "deletedAt" IS NULL'
        + '     AND "isActivate"= 1'
        + ' LIMIT 1'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            email: email,
        }
    })
    return results.pop();
};

const getRolesFromDatabase = async ({ email }) => {
    const queryStr = 'SELECT "roles"."name" '
        + ' FROM "users"'
        + ' INNER JOIN "userRoles" ON "users"."id" = "userRoles"."userId" AND "userRoles"."deletedAt" IS NULL'
        + ' INNER JOIN "roles" ON "userRoles"."roleId" = "roles"."id" AND "roles"."deletedAt" IS NULL'
        + ' WHERE '
        + '     "users"."email" = :email'
        + '     AND "users"."deletedAt" IS NULL'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            email: email
        }
    })
    return results;
};

const checkThenInsertNewUserToDatabase = async ({ email, password }) => {
    const queryStr = 'INSERT INTO'
        + ' users ("email","password","isActivate","createdAt","updatedAt")'
        + ' SELECT :email, :password, :isActivate, :currentDate, :currentDate'
        + ' WHERE NOT EXISTS ( SELECT 1 FROM "users" WHERE "email" = :email AND "deletedAt" IS NULL)'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            email: email,
            password: hashProvider.hash(password),
            isActivate: 0,
            currentDate: getCurrentDate()
        }
    });
    return metadata === 1;
};

module.exports = {
    signUp,
    signIn
}