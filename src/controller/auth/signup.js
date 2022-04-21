const hashProvider = require('../../utilities/hashProvider');
const { sequelize } = require("../../models/index");
const { getCurrentDate } = require('../../utilities/date');
const { REGISTER_SUCCESS, EMAIL_IS_TAKEN, ERROR_WHEN_REGISTER } = require('./message');
const { transporter } = require('../../utilities/mail')

const signUp = async (req, res) => {

    try {
        const signUpForm = getInfoFromRequest(req);
        const isAddSucessfully = await executeQuery(signUpForm);
        if (isAddSucessfully) {
            const info = await sendMail({ mailTo: signUpForm.email, linkActivate: getLinkActivateAccount() })
            // return res.status(201).json({ message: REGISTER_SUCCESS })
            return res.status(201).json(info)
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
    const queryStr = 'INSERT INTO'
        + ' users ("email","password", "name", "firstName", "lastName","isActivate","createdAt","updatedAt")'
        + ' SELECT :email, :password, :firstName, :lastName, :name, :isActivate, :currentDate, :currentDate'
        + ' WHERE NOT EXISTS ( SELECT 1 FROM "users" WHERE "email" = :email AND "deletedAt" IS NULL)'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            email: email,
            password: hashProvider.hash(password),
            firstName: firstName,
            lastName: lastName,
            name: name,
            isActivate: 0,
            currentDate: getCurrentDate()
        }
    });
    return metadata === 1;
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