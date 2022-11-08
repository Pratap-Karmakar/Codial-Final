const express = require('express');




// so as we exported the home_controller page of controllers so now we can access that page, and as this index.js pafe of routes is expoprted and accesable in the main index.js so the home_contorller is accessable in the main index.js as well.
const homeController = require('../controller/home_controller');



const router = express.Router();




// so now we cssn access the action of home_controller
router.get('/', homeController.home);

// to check whether this page is on or not
console.log('Router is Loaded');


// in the browser if any request comes with /users then just require my neighbour which is 
router.use('/users', require('./users'));

// in the browser if any request come with /post the just require my neighbour which is 
router.use('/posts', require('./posts'));




// we have to exports this index.js of the routes folder to be available in the the main index.js
module.exports = router;