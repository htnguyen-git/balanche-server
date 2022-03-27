const { sequelize } = require('../models/index');
const { getCurrentDate } = require('../utilities/date');

const getAll = async (req, res) => {
    const queryStr = 'SELECT * FROM "quests"'
        + ' WHERE "deletedAt" IS NULL'
        ;
    const [results, metadata] = await sequelize.query(queryStr);

    res.status(200).json({ quests: results })
};

const add = async (req, res) => {
    const quests = req.body.quests;
    const queryStr = 'INSERT INTO "quests" '
        + ' ("id","title","group","startTime","endTime","place","howToComPlete","completedAt","deletedAt","createdAt","updatedAt") '
        + ' VALUES'
        + quests.map(quest => {
            return `( DEFAULT, '${quest.title}','${quest.group}', '${quest.startTime}', '${quest.endTime}', '${quest.place}', '${quest.howToComPlete}', :currentDate, NULL, :currentDate, :currentDate)`
        })
        + ';';

    const [results, records] = await sequelize.query(queryStr, {
        replacements: {
            currentDate: getCurrentDate()
        }
    });
    res.status(200).json({ message: `${records} record inserted ` })
};

const update = async (req, res) => {
    const queryStr = 'UPDATE "quests"'
        + ' SET  '
        + '     "title" = :title,'
        + '     "group" = :group,'
        + '     "startTime" = :startTime,'
        + '     "endTime" = :endTime,'
        + '     "place" = :place,'
        + '     "howToComPlete" = :howToComPlete,'
        + '     "completedAt" = :completedAt,'
        + '     "deletedAt" = :deletedAt,'
        + '     "updatedAt" = :currentDate'
        + ' WHERE "id" =:id'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            title: req.body.title,
            group: req.body.group,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            place: req.body.place,
            howToComPlete: req.body.howToComPlete,
            completedAt: req.body.completedAt,
            deletedAt: null,
            currentDate: getCurrentDate(),
            id: req.params.id
        }
    });
    res.status(200).json(metadata)
};

const remove = async (req, res) => {
    const queryStr = 'UPDATE "quests" '
        + ' SET "deletedAt" =:deletedAt'
        + ' WHERE "id"= :id'
        ;
    const [results, metadata] = await sequelize.query(queryStr, {
        replacements: {
            id: req.params.id,
            deletedAt: getCurrentDate(),
        }
    })
    const isUpdateSuccess = metadata.rowCount === 1;
    isUpdateSuccess
        ? res.status(200).json({ message: `Update quest with id = ${req.params.id} successfully` })
        : res.status(200).json({ message: `Update quest with id = ${req.params.id} failed` })
};

const markDone = async (req, res) => {
    const queryStr = 'UPDATE "quests"'
        + ' SET "completedAt" =:completedAt'
        + ' WHERE "id"=:id'
        ;
    try {
        const [results, metadata] = await sequelize.query(queryStr, {
            replacements: {
                id: req.params.id,
                completedAt: getCurrentDate()
            }
        });
        res.status(200).json(metadata)
    } catch (error) {
        res.status(500).json({ message: error.toString() || "An error occurred while marking the quest as complete " })
    }

};

const exportQuest = async (req, res) => {

};

const importQuest = async (req, res) => {

};

module.exports = {
    getAll,
    add,
    update,
    remove,
    markDone,
    exportQuest,
    importQuest
}
