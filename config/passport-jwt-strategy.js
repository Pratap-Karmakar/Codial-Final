const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');



let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    // codial is the secreet key by which the user is able to decrepts his tokenn
    secretOrKey: 'codial'
}



passport.use(new JWTStrategy(opts, function (jwtPayLoad, done) {
    User.findById(jwtPayLoad._id, function (err, user) {
        if (err) {
            console.log('Error in finding the user from jwt');
            return;
        }
        if (user) {
            return done(null, user);
        }
        else {
            // false means that the user is not found
            return done(null, false);
        }
    })
}))


module.exports = passport;