const express = require('express');
const router = express.Router();

const authController = require('../controller/auth.controller')
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now(), " Router: roles")
    next()
});
router.post('/signUp', authController.signUp);
router.post('/signIn', authController.signIn);


module.exports = router;
