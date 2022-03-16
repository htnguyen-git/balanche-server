const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now(), " Router: user")
    next()
});

router.get('/seed', userController.seed);

router.get('/', userController.getAll);
router.get('/:id', userController.get);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/:id', userController.deactive);
router.delete('/:id', userController.remove);
router.patch('/:id', userController.update);


module.exports = router;
