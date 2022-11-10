const express = require('express');
const router = express.Router();
const passport=require('passport');



const commentsController = require('../controller/comments_controller');


// passport.checkAuthentication is for, one can post anything only when he is sign in
router.post('/create',passport.checkAuthentication, commentsController.create);

// to delete a comment which will be a authenticated delete
router.get('/destroy/:id',passport.checkAuthentication, commentsController.destroy);

module.exports = router;