const { sequelize, rolesContext, Sequelize } = require('../models/index');
const { QueryTypes } = require('sequelize')
const seed = async (req, res) => {
    const roles = [
        { name: "user" },
        { name: "admin" },
        { name: "moderator" },
    ]
    const data = await rolesContext.bulkCreate(roles);
    res.status(200).json(data)
};
const getAll = async (req, res) => {
    try {
        const queryStr = `SELECT * FROM roles WHERE "deletedAt" is NULL;`;
        const data = await sequelize.query(queryStr, { type: QueryTypes.SELECT })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: "Fail when get roles" })
    }

};
const add = async (req, res) => {
    const roleName = req.body.roleName;
    try {
        const queryStr = 'INSERT INTO roles ("name","createdAt","updatedAt")'
            + ' VALUES (:name, :currentDate, :currentDate)'
            + ' RETURNING "id","name";'
            ;

        const [result, metadata] = await sequelize.query(queryStr,
            {
                replacements: { name: roleName, currentDate: getCurrentDate() },
            }
        )
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Fail to add new role" })
    }

};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        const queryStr = 'UPDATE roles '
            + 'SET "deletedAt" = :deletedAt'
            + ' WHERE id=:id;'
            ;

        const [result, metadata] = await sequelize.query(queryStr, {
            replacements: { deletedAt: getCurrentDate(), id: id }
        })
        res.status(200).json({ message: "Remove role with id = " + id + " successfully" })
    } catch (error) {
        res.status(200).json({ message: "Fail to remove role with id = " + id })
    }

};

const getCurrentDate = () => new Date(Date.now()).toISOString();

module.exports = {
    seed,
    getAll,
    add,
    remove
}