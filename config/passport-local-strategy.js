
// about passport.js

// whether a particula user or user name is exists or not and if that user existed we want to set that user in to the cookie
// passport.js is use the session cookie
// session cookie stores all the session information and it is encrypted as well


// first we import passport
const passport = require('passport');
const User = require('../models/user');
// then we need to require the passport-local and speceficily the Strategy is the property we need to require from it
const LocalStrategy = require('passport-local').Strategy


// now we need to import user
const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        // find a user and establish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log("Error in finding user in passport");
                return done(err);
            }
            if (!user || user.password != password) {
                console.log("Invaild User name / Password ");
                return done(null , false);
            }
        })
    }
))
