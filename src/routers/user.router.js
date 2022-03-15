const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now(), " Router: user")
    next()
});
// define the homepage route
router.get('/', (req, res) => {
    res.json({ message: "User page" })
});

router.get('/seed', (req, res) => {
})
module.exports = router;
