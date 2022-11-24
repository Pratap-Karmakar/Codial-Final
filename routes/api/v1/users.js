// this is the route of users_api.js controller which is inside the controller > api > v1

// now we need to mention this in index.js which is inside the routes > api > v1


const express = require('express');
const router = express.Router();
const usersApi = require('../../../controller/api/v1/users_api')



router.post('/create-session', usersApi.createSession);


module.exports = router;