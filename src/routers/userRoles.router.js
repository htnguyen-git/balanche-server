const express = require('express');
const router = express.Router();
const userRolesController = require('../controller/userRoles.controller');
const auth = require('../middleware/auth.middleware');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', new Date().toISOString(), " Router: userRoles")
    next()
});


router.get('/', [auth.verifyToken, auth.isAdmin], userRolesController.getAll);
router.patch('/:id', [auth.verifyToken, auth.isAdmin], userRolesController.update);

module.exports = router;
