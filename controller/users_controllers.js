// to import the user's schema/details
// const { exists } = require('../models/user');
const User = require('../models/user');



// so now we have to export this page and the function
module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'User Profile'
    })
}






// to render the sign_up page
module.exports.signUp = function (req, res) {
    // if(req.isAuthenticated() this will take the user to the profile page if he sign in even if he wants to go to the sign in or sign up page.
    if(req.isAuthenticated()){
     return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Sign Up'
    })
}
// to get the sign_up data
module.exports.create = function (req, res) {
    console.log(req.body);
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Error in finding user in Signing Up');
            return;
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log("Error in finding user while Signing In");
                    return;
                }
                else {
                    return res.redirect('/users/sign-in');
                }
            })
        }
        else {
            return res.redirect('back');
        }
    });
}



// to render the sign_in page
module.exports.signIn = function (req, res) {
    // if(req.isAuthenticated() this will take the user to the profile page if he sign in even if he wants to go to the sign in or sign up page.
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: 'Sign In'
    })
}
// to get the sign_in data
module.exports.createSession = function (req, res) {
    // the user is signed in we just need to redirect
    return res.redirect('/');
}


// sign-out function
module.exports.destroySession=function(req,res){
    //to log out
    req.logout(function(err){
        if(err){
            return res.redirect('/');
        }
        else{
        return res.redirect('/');
        }
    })
}


