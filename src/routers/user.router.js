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
router.post('/activate/', userController.activate);
router.post('/deactivate/', [auth.verifyToken, auth.isAdmin], userController.deactivate);
router.delete('/:id', [auth.verifyToken, auth.isAdmin], userController.remove);
router.patch('/update', [auth.verifyToken], userController.update);
router.patch('/changePassword', [auth.verifyToken, auth.isNormalUser], userController.changePassword)
router.get('/getFullInfo', [auth.verifyToken], userController.getFullInfo);
router.get('/statitis-count-user', [auth.verifyToken, auth.isAdmin], userController.statisticalCountUser);
router.get('/statitis-growth-user', [auth.verifyToken, auth.isAdmin], userController.statitisGrowthUser);

module.exports = router;
