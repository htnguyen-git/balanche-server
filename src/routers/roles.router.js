const express = require('express');
const router = express.Router();

const roleController = require('../controller/roles.controller')
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now(), " Router: roles")
    next()
});
router.get('/seed', roleController.seed);
router.get('/getAll', roleController.getAll);
router.put('/', roleController.add);
router.delete('/:id', roleController.remove);


module.exports = router
