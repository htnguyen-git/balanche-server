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
    const queryStr = `SELECT * FROM roles WHERE "deletedAt" is NULL;`;
    const data = await sequelize.query(queryStr, { type: QueryTypes.SELECT })
    res.status(200).json(data)

};
const add = async (req, res) => {
    const roleName = req.body.roleName;
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
};

const remove = (req, res) => {
    const id = req.params.id;
    const queryStr = 'UPDATE roles '
        + 'SET "deletedAt" = :deletedAt'
        + ' WHERE id=:id;'
        ;

    const [result, metadata] = await sequelize.query(queryStr, {
        replacements: { deletedAt: getCurrentDate(), id: id }
    })
    console.log(result);
    console.log(metadata);
};

const getCurrentDate = new Date(Date.now()).toISOString();

module.exports = {
    seed,
    getAll,
    add,
    remove
}