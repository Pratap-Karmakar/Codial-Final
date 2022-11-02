// every time when we create a controller(users.js) we have to create a route so that we can access that controller(user_controller.js)

// const app = require('express');
const express = require('express');
const router = express.Router();






// accessing user_controller

// so now we have to access the users_controller(controller) by this user.js(route)
const usersController = require('../controller/users_controllers');
// now we have to access the profile function of user.js(route) in this page





// rendering the pages


// to render the profile page in the browser
router.get('/profile', usersController.profile);
// to render the sign-in page in the browser
router.get('/sign-in', usersController.signIn);
//to render the sign-up page in the browswer
router.get('/sign-up', usersController.signUp);
// to create a new user
router.post('/create', usersController.create);
// for the sign in page
router.post('/create-session',usersController.createSession);

// this page is exported and accessable by the main index.js of routes....and the route's index.js is exported further which is accessable by the main index.js
module.exports = router;

