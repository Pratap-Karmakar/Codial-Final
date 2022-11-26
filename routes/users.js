// every time when we create a controller(users.js) we have to create a route so that we can access that controller(user_controller.js)

const express = require('express');
const router = express.Router();
const passport=require('passport');






// accessing user_controller

// so now we have to access the users_controller(controller) by this user.js(route)
const usersController = require('../controller/users_controllers');
// now we have to access the profile function of user.js(route) in this page





// rendering the pages


// to render the profile page in the browser only if the authentication is done, means the user is logged in
// router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
// router.get('/profile', passport.checkAuthentication, usersController.profile);
// to update authorized logged in user
// router.post('/update/:id', passport.checkAuthentication, usersController.update);
// to render the sign-in page in the browser


router.get('/profile/:id', passport.checkAuthentication, usersController.profile_id);
router.post('/update/:id', passport.checkAuthentication, usersController.update);


router.get('/sign-in', usersController.signIn);
//to render the sign-up page in the browswer
router.get('/sign-up', usersController.signUp);
// to create a new user
router.post('/create', usersController.create);




// use passport as a middleware to authenticate
router.post('/create-session',
// middleware 
// passport first authenticate it if the authenticate is cool/done then done returns the user the call back function and if the authenticate is not cool/done the it redirect it to the sign-in page
passport.authenticate('local',{failureRedirect: '/users/sign-in'}), 
// so if the authenticate is done then the createSession function is called
usersController.createSession);
// for the sign-outt function






router.get('/sign-out', usersController.destroySession);
router.get('/profile',usersController.profile);



router.get('/auth/google', passport.authenticate('google',{scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);


// this page is exported and accessable by the main index.js of routes....and the route's index.js is exported further which is accessable by the main index.js
module.exports = router;



