
// about passport.js

// whether a particula user is exists or not and if that user existed we want to set that user in to the cookie
// passport.js is use the session cookie
// session cookie stores all the session information and it is encrypted as well


// first we import passport
const passport = require('passport');
// const { serializeUser } = require('passport');

// then we need to require the passport-local and speceficily the Strategy is the property we need to require from it
const LocalStrategy = require('passport-local').Strategy;


// now we need to import user
const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    // done is the call back function
    function (req,email, password, done) {
        // find a user and establish the identity
        // as we use the User.findOne that's why we have to import the user
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                req.flash('error',err);
                return done(err);
            }
            if (!user || user.password != password) {
                req.flash('error', 'Invalid Username/password');
                // there is no errror but the user is not found basically the authentication is not done, so we pust err as null and as the authentication is not done thst's why the authentication is false.
                return done(null, false);
            }
            else {
                // finally if user is found
                return done(null, user);
            }
        });
    }
));


// serialize User : serializeUser determines which data of the user object should be stored in the session. The result of the serializeUser method is attached to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide the user id as the key) req.session.passport.user = {id: 'xyz'}

// serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function (user, done) {
    done(null, user.id);
})


// Deserialize User : The first argument of deserializeUser corresponds to the key of the user object that was given to the done function (see 1.). So your whole object is retrieved with help of that key. That key here is the user id (key can be any key of the user object i.e. name,email etc). In deserializeUser that key is matched with the in memory array / database or any data resource.

// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("Error in finding User --> Passport");
            return done(err);
        }
        else {
            // null because no error is there and user because the user is found
            return done(null, user);
        }
    });
});

// serialize when a user sign in we find the id and send it to the cookie and further cookie send it to the browser and then browser makes a request so we deserialize it and find the user again, so this is the cycle.


// sending data of the signed in current user to the views

// first check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    // to find if the user is authenticated or not..... we are going to use a method on request called isauthenticate  // basically it detacted if the user is signed in or not if the user is signed in then pass him to the next page
    if (req.isAuthenticated()) {
        return next(); 
    }
    // if the user is not signed in
    // else {
        return res.redirect('/users/sign-in');
    // }
}


// set the user for the views, basically this is the middleware to check if the user is signed in or not
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}




// now we need to export this page
module.exports = passport;
