const { questContext } = require('../models/index');

const seed = () => {
    questContext.bulkCreate([
        {
            userId: 1,
            title: "title1",
            group: "group1",
            startTime: getCurrentDate(),
            endTime: getCurrentDate(),
            place: "this is place of title 1",
            howToComPlete: "This is the way to complete task title 1",
            createdAt: getCurrentDate(),
            updatedAt: getCurrentDate(),
            completedAt: null,
            deletedAt: null
        },
        {
            userId: 2,
            title: "title2",
            group: "group2",
            startTime: getCurrentDate(),
            endTime: getCurrentDate(),
            place: "this is place of title 2",
            howToComPlete: "This is the way to complete task title 2",
            createdAt: getCurrentDate(),
            updatedAt: getCurrentDate(),
            completedAt: null,
            deletedAt: null
        },
        {
            userId: 2,
            title: "title3",
            group: "group1",
            startTime: getCurrentDate(),
            endTime: getCurrentDate(),
            place: "this is place of title 3",
            howToComPlete: "This is the way to complete task title 3",
            createdAt: getCurrentDate(),
            updatedAt: getCurrentDate(),
            completedAt: null,
            deletedAt: null
        },
    ]).then(() => console.log("seed quest complete"))
};
const getCurrentDate = () => new Date(Date.now()).toISOString();
module.exports = { seed };
