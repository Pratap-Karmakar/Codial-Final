const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User=require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "1081735509561-0i67sik2qpd9nnvtjo7ln32e8beu9c6k.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    // google generets the access token and gives us if access token is expires the we use refresh toke to get a new access token
    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({
            email: profile.emails[0].value}).exec(function(err,user){
                if(err){
                    console.log('Error in google Strategy-Passport!', err);
                    return;
                }
                
                // it will print the access token but refresh token will be undefined unless we ask for a refresh token
                console.log(accessToken,refreshToken);
                // it will print all the profile information
                console.log(profile);
                
                if(user){
                    // if user found, set this user as req.user(sign in)
                    return done(null, user);
                }
                else{
                    // if user not found, create the user and set it as req.user(sign in)
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    },
                    function(err,user){
                        if(err){
                            console.log('Error in creating user google Strategy-Passport!',err);
                            return;
                        }
                        else{
                            return done(null,user);
                        }
                    });
                }
            })
        })
    
);

module.exports=passport;