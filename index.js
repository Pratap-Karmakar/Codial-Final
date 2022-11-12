const express = require('express');
// use cookie-parser
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
// to add css styles we call express-ejs-layouts
const expressLayouts=require('express-ejs-layouts');
// we have to import database mongoose
const db = require('./config/mongoose');
// after installing express-session we need to require it


// used for session cookie

const session=require('express-session');
// we need to require passport
const passport=require('passport');
// we need to require passport-session library
const passportLocal=require('./config/passport-local-strategy');


// connect-mongo, in this case one argument has to be passed here which is session
const MongoStore = require('connect-mongo');
const sassMiddleware= require('node-sass-middleware');

// for connect-flash massage
const flash= require('connect-flash');

// to require the middleware.js for the flash massage
const customMware = require('./config/middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))




// setting up the middleware
app.use(express.urlencoded());

// telling the app to use the assets file
app.use(expressLayouts);





// now tell the app to use cookie-parser
app.use(cookieParser());





// to use the css files
app.use(express.static('./assets'));




// now we need to tell the app to use express layouts
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);






// after installing ejs we have to tell that we need to use ejs as our view engine
app.set('view engine', 'ejs');
app.set('views', './views');



// mongo store is used to store the session cookie in the db

//  now we need to add amiddleware which takes in that session cookie and encrypts it.
app.use(session({
    name: 'codial',
    // TODO chane the secret before deployment in production mode
    secret: 'blashsomething',
    // if any user is not logged means the ideantity is not established in do i need to save his data we don't that's why it is false
    saveUninitialized:'false',
    // if the identity is established or some sort of data is present in the session cookie means the user's info, do i need to rewrite the data even if it is not changed, we don't that's why it is false.
    resave:'false',
    // so here we have to give the active time or age of the cookie, means how long the cookie will work and afthe the age or time the cookie expire 
    cookie: {
        maxAge: (1000 * 60 *100)
    },
    store:  MongoStore.create ({
        
        mongoUrl:`mongodb://localhost/codeial_development`,
        autoRemove:'disabled'
        
    },
    function(err){
        console.log(err ||  'connect-mongodb setup ok');
    }
    )
}));


// now we need to tell the app to use passport
app.use(passport.initialize());
app.use(passport.session());

// set the user for the views(p-l-s)
// app.use(passport.setAuthenticatedUser);
app.use(passport.setAuthenticatedUser);


// we need to tell the app to use session
app.use(flash());
// now we need to use the middleware.js for the flash massage
app.use(customMware.setFlash);





// as we have exported the index.js of the routes folder so now we have to access that in this index.js folder
app.use('/', require('./routes/index'));

// // so as we've exported the express router in the index.js which is in the router folder, now we have to tell app to use it.
// const routes = require('./routes');




app.listen(port, function (error) {
    if (error) {
        console.log(`Error in running the server, ${error}`);
    }
    else {
        console.log(`Server is running on, ${port}`);
    }
});




