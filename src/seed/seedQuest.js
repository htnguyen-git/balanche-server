const { questContext } = require('../models/index');

const seed = () => {
    questContext.bulkCreate([
        {
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
