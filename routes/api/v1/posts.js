const express = require('express');
const router = express.Router();
const passport=require('passport');

const postsApi = require('../../../controller/api/v1/posts_api');




router.get('/', postsApi.index);

// to delete a post authenticated
                                            // to prevent session cookie being generated we setted the session to be false
router.delete('/:id',passport.authenticate('jwt',{session:false}),postsApi.destroy);




module.exports = router;


