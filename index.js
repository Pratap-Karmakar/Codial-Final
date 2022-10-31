const port = 8000;
const express = require('express');
const app = express();


// as we have exported the index.js of the routes folder so now we have to access that in this index.js folder
app.use('/', require('./routes/index'));




// after installing ejs we have to tell that we need to use ejs as our view engine
app.set('view engine', 'ejs');
app.set('views', './views');



// setting up the middleware
app.use(express.urlencoded());




// for reading and writing in to cookies we will be using a library or a package called cookie-parser
// npm install cookie-parser

// first require the cookie-parser
const cookieParser=require('cookie-parser');
// now we have to tell the app to use it
app.use(cookieParser());




app.listen(port, function (error) {
    if (error) {
        console.log(`Error in running the server, ${error}`);
    }
    else {
        console.log(`Server is running on, ${port}`);
    }
});
