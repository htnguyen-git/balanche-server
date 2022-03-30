const express = require('express');
const router = express.Router();

const roleController = require('../controller/roles.controller');
const auth = require('../middleware/auth.middleware')
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', new Date().toISOString(), " Router: roles")
    next()
});

router.get('/getAll', [auth.verifyToken, auth.isAdmin], roleController.getAll);
router.put('/', [auth.verifyToken, auth.isAdmin], roleController.add);
router.delete('/:id', [auth.verifyToken, auth.isAdmin], roleController.remove);


module.exports = router;
