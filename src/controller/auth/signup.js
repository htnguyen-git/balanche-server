const hashProvider = require('../../utilities/hashProvider');
const { sequelize } = require("../../models/index");
const { getCurrentDate } = require('../../utilities/date');
const { REGISTER_SUCCESS, EMAIL_IS_TAKEN, ERROR_WHEN_REGISTER } = require('./message');
const { transporter } = require('../../utilities/mail')

const signUp = async (req, res) => {

    try {
        const signUpForm = getInfoFromRequest(req);
        const results = await executeQuery(signUpForm);
        const isAddSucessfully = results.length > 0;
        if (isAddSucessfully) {
            // const info = await sendMail({ mailTo: signUpForm.email, linkActivate: getLinkActivateAccount() })
            return res.status(201).json({ message: REGISTER_SUCCESS })
        } else {
            return res.status(409).json({ message: EMAIL_IS_TAKEN })
        }
    } catch (error) {
        return res.status(500).json({ message: error.toString() || ERROR_WHEN_REGISTER })
    }
}

const getInfoFromRequest = (req) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const name = firstName && lastName && firstName.trim() + ' ' + lastName.trim();
    return { email, password, firstName, lastName, name }
}


const executeQuery = async ({ email, password, firstName, lastName, name }) => {
    const checkUserQuery = ' SELECT * FROM "users" WHERE "email" = :email';
    const [checkUserResult, checkUserMetadata] = await sequelize.query(checkUserQuery, {
        replacements: {
            email: email
        }
    })
    if (checkUserResult.length > 0) { return [] };

    const queryStr =
        'WITH "newUser" AS ('
        + '     INSERT INTO'
        + '         "users" ('
        + '             "id",'
        + '             "name",'
        + '             "firstName",'
        + '             "lastName",'
        + '             "password",'
        + '             "email",'
        + '             "isActivate",'
        + '             "createdAt",'
        + '             "updatedAt"'
        + '         )'
        + '     VALUES ('
        + '         DEFAULT,'
        + '         :name ,'
        + '         :firstName ,'
        + '         :lastName ,'
        + '         :password ,'
        + '         :email ,'
        + '         0 ,'
        + '         :currentDate ,'
        + '         :currentDate '
        + '         ) RETURNING "id"'
        + ')'
        + 'INSERT INTO'
        + '     "userRoles" ("id", "userId", "roleId", "createdAt", "updatedAt")'
        + 'VALUES('
        + ' DEFAULT, '
        + ' (SELECT "id" FROM  "newUser" ) ,'
        + ' 1,'
        + ' :currentDate ,'
        + ' :currentDate )'
        + 'RETURNING "id"'
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            name: name,
            firstName: firstName,
            lastName: lastName,
            password: hashProvider.hash(password),
            email: email,
            currentDate: getCurrentDate(),
        }
    })
    return results;
}

const sendMail = async ({ mailTo, linkActivate }) => {
    const info = await transporter.sendMail({
        from: 'tfosorcim1994@outlook.com',
        to: mailTo,
        subject: "User Registeration",
        text: `Please check ${linkActivate} to activate account`
    })
    return info
}

const getLinkActivateAccount = () => {
    return "https:activate.com"
}

module.exports = signUp;