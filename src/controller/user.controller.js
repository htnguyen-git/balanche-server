const hashProvider = require('../utilities/hashProvider');
const { sequelize } = require("../models/index");
const { getCurrentDate } = require('../utilities/date');

const getAll = async (req, res) => {
    const queryStr = 'SELECT "id", "avatar","firstName","lastName","email"'
        + ' FROM "users"'
        + ' WHERE "deletedAt" IS NULL;'
        ;
    try {
        const [result, metadata] = await sequelize.query(queryStr);
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ message: error.toString() || "Some error occured when retrieving user" })
    }

};

const activate = async (req, res) => {
    const id = req.params.id;
    const queryStr = 'UPDATE "users"'
        + ' SET "isActivate" = :isActivate'
        + ' WHERE "id"=:id;';
    try {
        const [result, metadata] = await sequelize.query(queryStr, {
            replacements: {
                id: id,
                isActivate: 1
            }
        })
        const isActivateSuccessfully = metadata.rowCount !== 0;
        isActivateSuccessfully
            ? res.status(200).json({ message: "Activated successfully" })
            : res.status(500).json({ message: "Can not found user with id = " + id })
    } catch (error) {
        res.status(500).json({ message: error.toString() || "Some error occured when activate user" })
    }
};

const deactive = async (req, res) => {
    const id = req.params.id;
    const queryStr = 'UPDATE "users"'
        + ' SET "isActivate" = :isActivate '
        + ' WHERE "id"=:id AND "deletedAt" IS NULL'
        ;
    try {
        const [result, metadata] = await sequelize.query(queryStr, {
            replacements: {
                isActivate: 0,
                id: id,
            }
        })
        const isDeactiveSuccessFully = metadata.rowCount === 1;
        isDeactiveSuccessFully
            ? res.status(200).json({ message: "Deactivated successfully" })
            : res.status(500).json({ message: "Can not found user with id = " + id })
    } catch (error) {
        res.status(500).json({ message: error.toString() || "Some error occured when deactivate user" })
    }
};

const remove = async (req, res) => {
    const id = req.params.id;
    const queryStr = 'UPDATE "users"'
        + ' SET "deletedAt" = :currentDate '
        + ' WHERE "id"=:id AND "deletedAt" IS NULL'
        ;
    try {
        const [result, metadata] = await sequelize.query(queryStr, {
            replacements: {
                currentDate: getCurrentDate(),
                id: id,
            }
        })
        const idDeletedSuccessfully = metadata.rowCount === 1;
        idDeletedSuccessfully
            ? res.status(200).json({ message: "Deleted successfully" })
            : res.status(404).json({ message: "Can not found user with id = " + id })
    } catch (error) {
        res.status(500).json({ message: error.toString() || "Some error occured when delete user" })
    }
};

const update = async (req, res) => {
    const queryStr = 'UPDATE "users"'
        + ' SET '
        + '     "name"=:name, "firstName"=:firstName, "lastName"=:lastName, "password"=:password, "avatar"=:avatar,'
        + '     "city"=:city, "country"=:country, "jobTitle"=:jobTitle, '
        + '     "email"=:email, "timeZone"=:timeZone, "phone"=:phone,'
        + '     "updatedAt"=:currentDate'
        + ' WHERE "id"=:id AND "isActivate" = 1;'
        ;
    try {
        const [results, metadata] = await sequelize.query(queryStr, {
            replacements: {
                id: req.params.id,
                name: req.body.name,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hashProvider.hash(req.body.password),
                avatar: req.body.avatar,
                city: req.body.city,
                country: req.body.city,
                jobTitle: req.body.jobTitle,
                email: req.body.email,
                timeZone: req.body.timeZone,
                phone: req.body.phone,
                currentDate: getCurrentDate(),
            }
        })
        const isUpdatedSuccessfully = metadata.rowCount === 1
        isUpdatedSuccessfully
            ? res.status(200).json({ message: "Update successfully" })
            : res.status(200).json({ message: "Update fail with user' id = " + req.params.id })
    } catch (error) {
        res.status(500).json({ message: error.toString() || "Some error occured when update user" })
    }
};

module.exports = {
    getAll,
    activate,
    deactive,
    remove,
    update
}