const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now(), " Router: user")
    next()
});

router.get('/', userController.getAll);
router.get('/activate/:id', userController.activate);
router.get('/deactivate/:id', userController.deactive);
router.delete('/:id', userController.remove);
router.patch('/:id', userController.update);


module.exports = router;
