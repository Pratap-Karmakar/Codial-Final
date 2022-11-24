const express = require('express');
const router = express.Router();

router.use('/posts',require('./posts'));


// now we need to mention the users.js routes which is inside the routes > api > v1
router.use('/users',require('./users'));


module.exports = router;