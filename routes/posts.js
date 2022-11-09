const express = require('express');
const router = express.Router();
const passport=require('passport');



const postController = require('../controller/posts_controller');


// passport.checkAuthentication is for, one can post anything only when he is sign in
router.post('/create',passport.checkAuthentication, postController.create);

module.exports = router;