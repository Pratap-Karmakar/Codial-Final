const port = 8000;
const express = require('express');
const app = express();

// setting up the middleware
app.use(express.urlencoded());



app.use(express.static('./assets'));




// as we have exported the index.js of the routes folder so now we have to access that in this index.js folder
app.use('/', require('./routes/index'));
// so as we've exported the express router in the index.js which is in the router folder, now we have to tell app to use it.
const routes=require('./routes');
app.use('/',routes);



// we have to import database mongoose
const db=require('./config/mongoose');

// use cookie-parser
const cookieParser=require('cookie-parser');
// now tell the app to use cookie-parser
app.use(cookieParser());



// after installing ejs we have to tell that we need to use ejs as our view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function (error) {
    if (error) {
        console.log(`Error in running the server, ${error}`);
    }
    else {
        console.log(`Server is running on, ${port}`);
    }
});

