const express = require('express');
const router = express.Router();
const userRolesController = require('../controller/userRoles.controller');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now(), " Router: userRoles")
    next()
});
// define the homepage route
router.get('/seed', userRolesController.seed);
router.get('/', userRolesController.getAll);
router.patch('/', userRolesController.update);
module.exports = router
