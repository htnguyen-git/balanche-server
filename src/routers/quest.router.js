const express = require('express');
const router = express.Router();

const questController = require('../controller/quest/index')
const auth = require('../middleware/auth.middleware');
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', new Date().toISOString(), " Router: questController")
    next()
});

router.get('/', [auth.verifyToken, auth.isNormalUser], questController.getAll);
router.post('/', [auth.verifyToken, auth.isNormalUser], questController.add);
router.patch('/:id', [auth.verifyToken, auth.isNormalUser], questController.update);
router.delete('/', [auth.verifyToken, auth.isNormalUser], questController.remove);
// router.get('/export', [auth.verifyToken, auth.isNormalUser], questController.exportQuest);
// router.post('/import', [auth.verifyToken, auth.isNormalUser], questController.importQuest);
router.post('/markDone/', [auth.verifyToken, auth.isNormalUser], questController.markDone);
router.get('/getUndone', [auth.verifyToken, auth.isNormalUser], questController.getUnDone);

module.exports = router;
