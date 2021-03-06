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
            createdAt: '2022-01-04T15:12:52.858Z',
            updatedAt: '2022-01-04T15:12:52.858Z',
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
            createdAt: '2022-01-04T15:12:52.858Z',
            updatedAt: '2022-01-04T15:12:52.858Z',
        },
        {
            name: "user3",
            firstName: "firstname2",
            lastName: "lastName2",
            password: hashProvider.hash("Asdf1234!"),
            avatar: "base64image2",
            city: "city2",
            country: "country2",
            jobTitle: "job 2",
            email: "user3@gmail.com",
            timeZone: "GMT +7",
            phone: "0222222222",
            isActivate: 0,
            deletedAt: null,
            createdAt: '2022-02-04T15:12:52.858Z',
            updatedAt: '2022-02-04T15:12:52.858Z',
        },
        {
            name: "user4",
            firstName: "firstname2",
            lastName: "lastName2",
            password: hashProvider.hash("Asdf1234!"),
            avatar: "base64image2",
            city: "city2",
            country: "country2",
            jobTitle: "job 2",
            email: "user4@gmail.com",
            timeZone: "GMT +7",
            phone: "0222222222",
            isActivate: 1,
            deletedAt: "2022-02-05T15:12:52.858Z",
            createdAt: '2022-02-04T15:12:52.858Z',
            updatedAt: '2022-02-04T15:12:52.858Z',
        },
        {
            name: "user5",
            firstName: "firstname2",
            lastName: "lastName2",
            password: hashProvider.hash("Asdf1234!"),
            avatar: "base64image2",
            city: "city2",
            country: "country2",
            jobTitle: "job 2",
            email: "user5@gmail.com",
            timeZone: "GMT +7",
            phone: "0222222222",
            isActivate: 1,
            deletedAt: null,
            createdAt: '2022-03-04T15:12:52.858Z',
            updatedAt: '2022-03-04T15:12:52.858Z',
        },
        {
            name: "user6",
            firstName: "firstname2",
            lastName: "lastName2",
            password: hashProvider.hash("Asdf1234!"),
            avatar: "base64image2",
            city: "city2",
            country: "country2",
            jobTitle: "job 2",
            email: "user5@gmail.com",
            timeZone: "GMT +7",
            phone: "0222222222",
            isActivate: 1,
            deletedAt: "2022-03-03T15:12:52.858Z",
            createdAt: '2022-03-04T15:12:52.858Z',
            updatedAt: '2022-03-04T15:12:52.858Z',
        },
        {
            name: "user7",
            firstName: "firstname2",
            lastName: "lastName2",
            password: hashProvider.hash("Asdf1234!"),
            avatar: "base64image2",
            city: "city2",
            country: "country2",
            jobTitle: "job 2",
            email: "user5@gmail.com",
            timeZone: "GMT +7",
            phone: "0222222222",
            isActivate: 1,
            deletedAt: getCurrentDate(),
            createdAt: '2022-04-04T15:12:52.858Z',
            updatedAt: '2022-04-04T15:12:52.858Z',
        },
        {
            name: "user8",
            firstName: "firstname2",
            lastName: "lastName2",
            password: hashProvider.hash("Asdf1234!"),
            avatar: "base64image2",
            city: "city2",
            country: "country2",
            jobTitle: "job 2",
            email: "user5@gmail.com",
            timeZone: "GMT +7",
            phone: "0222222222",
            isActivate: 1,
            deletedAt: null,
            createdAt: '2022-04-04T15:12:52.858Z',
            updatedAt: '2022-04-04T15:12:52.858Z',
        },
        {
            name: "user9",
            firstName: "firstname2",
            lastName: "lastName2",
            password: hashProvider.hash("Asdf1234!"),
            avatar: "base64image2",
            city: "city2",
            country: "country2",
            jobTitle: "job 2",
            email: "user5@gmail.com",
            timeZone: "GMT +7",
            phone: "0222222222",
            isActivate: 1,
            deletedAt: getCurrentDate(),
            createdAt: '2022-04-04T15:12:52.858Z',
            updatedAt: '2022-04-04T15:12:52.858Z',
        },
        {
            name: "user10",
            firstName: "firstname2",
            lastName: "lastName2",
            password: hashProvider.hash("Asdf1234!"),
            avatar: "base64image2",
            city: "city2",
            country: "country2",
            jobTitle: "job 2",
            email: "user5@gmail.com",
            timeZone: "GMT +7",
            phone: "0222222222",
            isActivate: 1,
            deletedAt: "2022-04-05T15:12:52.858Z",
            createdAt: '2022-04-04T15:12:52.858Z',
            updatedAt: '2022-04-04T15:12:52.858Z',
        },
        {
            name: "user11",
            firstName: "firstname2",
            lastName: "lastName2",
            password: hashProvider.hash("Asdf1234!"),
            avatar: "base64image2",
            city: "city2",
            country: "country2",
            jobTitle: "job 2",
            email: "user5@gmail.com",
            timeZone: "GMT +7",
            phone: "0222222222",
            isActivate: 1,
            deletedAt: null,
            createdAt: '2022-05-04T15:12:52.858Z',
            updatedAt: '2022-05-04T15:12:52.858Z',
        },
        {
            name: "user12",
            firstName: "firstname2",
            lastName: "lastName2",
            password: hashProvider.hash("Asdf1234!"),
            avatar: "base64image2",
            city: "city2",
            country: "country2",
            jobTitle: "job 2",
            email: "user5@gmail.com",
            timeZone: "GMT +7",
            phone: "0222222222",
            isActivate: 1,
            deletedAt: getCurrentDate(),
            createdAt: '2022-05-04T15:12:52.858Z',
            updatedAt: '2022-05-04T15:12:52.858Z',
        },
    ]).then(() => console.log("seed user complete"))
};
const getCurrentDate = () => new Date(Date.now()).toISOString();
module.exports = { seed };
