const { usersContext } = require('../models/index');
const hashProvider = require('../utilities/hashProvider');

const seed = () => {
    usersContext.bulkCreate([
        {
            name: "user1",
            firstName: "firstname1",
            lastName: "lastName1",
            password: hashProvider.hash("Asdf1234!"),
            avatar: "base64image1",
            city: "city1",
            country: "country1",
            jobTitle: "job 1",
            email: "user@gmail.com",
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
            password: hashProvider.hash("Asdf1234!"),
            avatar: "base64image2",
            city: "city2",
            country: "country2",
            jobTitle: "job 2",
            email: "admin@gmail.com",
            timeZone: "GMT +7",
            phone: "0222222222",
            isActivate: 1,
            deletedAt: null,
            createdAt: getCurrentDate(),
            updatedAt: getCurrentDate(),
        },
    ]).then(() => console.log("seed user complete"))
};
const getCurrentDate = () => new Date(Date.now()).toISOString();
module.exports = { seed };
