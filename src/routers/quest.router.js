const express = require('express');
const router = express.Router();

const questController = require('../controller/quest.controller')
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now(), " Router: questController")
    next()
});

router.get('/', questController.getAll);
router.post('/', questController.add);
router.patch('/:id', questController.update);
router.delete('/:id', questController.remove);
router.get('/export', questController.exportQuest);
router.post('/import', questController.importQuest);
router.post('/markDone/:id', questController.markDone);

module.exports = router;
