const { sequelize } = require('../../models/index');
const { getCurrentDate } = require('../../utilities/date');
const { UPDATE_SUCCESS, UPDATE_FAIL, UPDATE_ERROR } = require('./message');

const update = async (req, res) => {
    console.log("update")
    try {
        const updatedForm = getInfoFromRequest(req);
        const isUpdateSuccess = await executeQuery(updatedForm);
        return isUpdateSuccess
            ? res.status(200).json({ message: UPDATE_SUCCESS })
            : res.status(200).json({ message: UPDATE_FAIL + updatedForm.id })
    } catch (error) {
        return res.status(500).json({ message: error.toString() || UPDATE_ERROR })
    }
}

const getInfoFromRequest = (req) => {
    const id = req.userId;
    const name = req.body.name;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const avatar = req.body.avatar;
    const city = req.body.city;
    const country = req.body.country;
    const jobTitle = req.body.jobTitle;
    const email = req.body.email;
    const timeZone = req.body.timeZone;
    const phone = req.body.phone;
    const currentDate = getCurrentDate();
    return { id, name, firstName, lastName, avatar, city, country, jobTitle, email, timeZone, phone, currentDate };
}

const executeQuery = async ({ id, name, firstName, lastName, avatar, city, country, jobTitle, email, timeZone, phone, currentDate }) => {
    const queryStr = 'UPDATE "users"'
        + ' SET '
        + '     "name"=:name, "firstName"=:firstName, "lastName"=:lastName, "avatar"=:avatar,'
        + '     "city"=:city, "country"=:country, "jobTitle"=:jobTitle, '
        + '     "email"=:email, "timeZone"=:timeZone, "phone"=:phone,'
        + '     "updatedAt"=:currentDate'
        + ' WHERE "id"=:id AND "isActivate" = 1'
        + ' RETURNING "id"'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            id: id,
            name: name,
            firstName: firstName,
            lastName: lastName,
            avatar: avatar,
            city: city,
            country: country,
            jobTitle: jobTitle,
            email: email,
            timeZone: timeZone,
            phone: phone,
            currentDate: getCurrentDate(),
        }
    });
    return results.length > 0;
}

module.exports = update;