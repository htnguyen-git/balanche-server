const hashProvider = require('../utilities/hashProvider');
const { sequelize, usersContext, Sequelize } = require("../models/index");
const { QueryTypes } = require('sequelize');

const seed = async (req, res) => {
    const users = [
        {
            name: "user1",
            firstName: "firstname1",
            lastName: "lastName1",
            password: hashProvider.hash("password1"),
            avatar: "base64image1",
            city: "city1",
            country: "country1",
            jobTitle: "job 1",
            email: "mail1@gmail.com",
            timeZone: "GMT +7",
            phone: "0111111111",
            isActivate: 1,
            deletedAt: null,
            createdAt: getCurrentDate(),
            updatedAt: getCurrentDate(),
        },
        {
            name: "user2",
            firstName: "firstname2",
            lastName: "lastName2",
            password: hashProvider.hash("password2"),
            avatar: "base64image2",
            city: "city2",
            country: "country2",
            jobTitle: "job 2",
            email: "mail2@gmail.com",
            timeZone: "GMT +7",
            phone: "0222222222",
            isActivate: 2,
            deletedAt: null,
            createdAt: getCurrentDate(),
            updatedAt: getCurrentDate(),
        },
    ];
    const data = await usersContext.bulkCreate(users);
    res.status(200).json(data)
};

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

const register = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const queryStr = 'INSERT INTO'
        + ' users ("email","password","isActivate","createdAt","updatedAt")'
        + ' SELECT :email, :password, :isActivate, :currentDate, :currentDate'
        + ' WHERE NOT EXISTS ( SELECT 1 FROM "users" WHERE "email" = :email AND "deletedAt" IS NULL)'
        ;
    try {
        const [results, metadata] = await sequelize.query(queryStr, {
            replacements: {
                email: email,
                password: password,
                isActivate: 0,
                currentDate: getCurrentDate()
            }
        })
        const isAddSucessfully = metadata === 1;
        isAddSucessfully
            ? res.status(200).json({ message: "Register successfully" })
            : res.status(500).json({ message: "Email is already taken" })
    } catch (error) {
        res.status(500).json({ message: error.toString() || "Some error occured when register user" })
    }
};

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const queryStr = 'SELECT DISTINCT * '
        + 'FROM "users"'
        + 'WHERE "email"=:email AND "deletedAt" IS NULL AND "isActivate"=1'
        ;
    try {
        const [result, metadata] = await sequelize.query(queryStr, {
            replacements: {
                email: email,
            }
        });
        const isValidEmail = result.length > 0;
        const isValidPassword = isValidEmail && hashProvider.compare(password, result[0].password);
        if (isValidEmail && isValidPassword) {
            res.status(200).json({ data: result })
        } else (
            res.status(500).json({ message: "Wrong email or password" })
        )
    } catch (error) {
        res.status(500).json({ message: error.toString() || "Some error occured when  loggin" })
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

const getCurrentDate = () => new Date(Date.now()).toISOString();

module.exports = {
    seed,
    getAll,
    register,
    login,
    activate,
    deactive,
    remove,
    update
}