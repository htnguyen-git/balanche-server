const jwt = require("jsonwebtoken");
const hashProvider = require('../../utilities/hashProvider');
const { sequelize } = require("../../models/index");
const { authConfig } = require('./config');
const { EMAIL_OR_PASSWORD_INVALID, ERROR_WHEN_SIGN_IN } = require('./message')

const signIn = async (req, res) => {
    try {
        const userInfoFromRequest = getSignInForm(req);
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
            : res.status(401).json(
                {
                    message: EMAIL_OR_PASSWORD_INVALID,
                    accessToken: null
                }
            )
    } catch (error) {
        return res.status(500).json({ error: error.toString() || ERROR_WHEN_SIGN_IN })
    }
};
const getSignInForm = (req) => {
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

module.exports = signIn;