const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now(), " Router: roles")
    next()
});
// define the homepage route
router.get('/', (req, res) => {
    res.json({ message: "Role page" })
});

module.exports = router
