const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const auth = require('../middleware/auth.middleware');
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', new Date().toISOString(), " Router: user")
    next()
});

router.get('/', [auth.verifyToken, auth.isAdmin], userController.getAll);
router.get('/activate/:id', userController.activate);
router.get('/deactivate/:id', [auth.verifyToken, auth.isAdmin], userController.deactive);
router.delete('/:id', [auth.verifyToken, auth.isAdmin], userController.remove);
router.patch('/:id', [auth.verifyToken, auth.isNormalUser], userController.update);


module.exports = router;
