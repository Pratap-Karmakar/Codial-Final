// every time when we create a controller(users.js) we have to create a route so that we can access that controller(user_controller.js)

// const app = require('express');
const express = require('express');
const router = express.Router();


// this page is exported and accessable by the main index.js of routes....and the route's index.js is exported further which is accessable by the main index.js
module.exports = router;




// accessing user_controller

// so now we have to access the users_controller(controller) by this user.js(route)
const usersController = require('../controller/users_controllers');
// now we have to access the profile function of user.js(route) in this page
router.get('/profile', usersController.profile);
