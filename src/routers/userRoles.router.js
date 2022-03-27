const express = require('express');
const router = express.Router();
const userRolesController = require('../controller/userRoles.controller');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now(), " Router: userRoles")
    next()
});


router.get('/', userRolesController.getAll);
router.patch('/:id', userRolesController.update);

module.exports = router;
