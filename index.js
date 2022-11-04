const express = require('express');
const app = express();
const port = 8000;
// we have to import database mongoose
const db = require('./config/mongoose');
// after installing express-session we need to require it


// used for session cookie

const session=require('express-session');
// we need to require passport
const passport=require('passport');
// we need to require passport-session library
const passportLocal=require('./config/passport-local-strategy');




// setting up the middleware
app.use(express.urlencoded());



// use cookie-parser
const cookieParser = require('cookie-parser');
// now tell the app to use cookie-parser
app.use(cookieParser());






// app.use(express.static('./assets'));




// so as we've exported the express router in the index.js which is in the router folder, now we have to tell app to use it.
// const routes = require('./routes');
// app.use('/', routes);







// after installing ejs we have to tell that we need to use ejs as our view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//  now we need to add amiddleware which takes in that session cookie and encrypts it.
app.use(session({
    name: 'codial',
    // TODO chane the secret before deployment in production mode
    secret: 'blashsomething',
    saveUninitialized:'false',
    resave:'false',
    // so here we have to give the active time or age of the cookie, means how long the cookie will work and afthe the age or time the cookie expire 
    cookie: {
        maxAge: (1000 * 60 *100)
    }
}));


// now we need to tell the app to use passport
app.use(passport.initialize());
app.use(passport.session());





// as we have exported the index.js of the routes folder so now we have to access that in this index.js folder
app.use('/', require('./routes/index'));





app.listen(port, function (error) {
    if (error) {
        console.log(`Error in running the server, ${error}`);
    }
    else {
        console.log(`Server is running on, ${port}`);
    }
});

