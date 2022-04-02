const express = require('express');
const router = express.Router();
const userController = require('../controller/user/index');
const auth = require('../middleware/auth.middleware');
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', new Date().toISOString(), " Router: user")
    next()
});

router.get('/', [auth.verifyToken, auth.isAdmin], userController.getAll);
router.get('/activate/:id', userController.activate);
router.get('/deactivate/:id', [auth.verifyToken, auth.isAdmin], userController.deactivate);
router.delete('/:id', [auth.verifyToken, auth.isAdmin], userController.remove);
router.patch('/update', [auth.verifyToken, auth.isNormalUser], userController.update);
router.patch('/changePassword', [auth.verifyToken, auth.isNormalUser], userController.changePassword)

module.exports = router;
