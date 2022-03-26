const seedAll = () => {
    require('./seedUser').seed();
    require('./seedUserRoles').seed();
    require('./seedRoles').seed();
    require('./seedQuest').seed();
}

module.exports = {
    seedAll
}