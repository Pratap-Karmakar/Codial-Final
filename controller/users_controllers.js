// to import the user's schema/details

const User = require('../models/user');

const multer=require('multer');

//for deleting we need the file system module and the path because we will be deleting form a path
const fs=require('fs');
const path=require('path');



// so now we have to export this page and the function
module.exports.profile_id = function (req, res) {
    // to locate the user for to show in the home page
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        })
    })
}
// module.exports.profile=function(req,res){

// }

module.exports.profile = function (req, res) {
    console.log(req.user);
    User.findById(req.user.id, function (err, user) {
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        })
    })
}

module.exports.update = async function(req, res){
   

    if(req.user.id == req.params.id){

        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if (err) {console.log('*****Multer Error: ', err)}
                
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file){
                    // here we check if the user already have any avatar or not if there is a avatar the remove it and upload a new avatar
                    
                    // if(user.avatar){
                    //     // delete function is unlinkSync
                    //     fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    // }


                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;                    
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }


    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}





// to render the sign_up page
module.exports.signUp = function (req, res) {
    // if(req.isAuthenticated() this will take the user to the profile page if he sign in even if he wants to go to the sign in or sign up page.
    if (req.isAuthenticated()) {
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
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: 'Sign In'
    })
}
// to get the sign_in data
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully');
    // the user is signed in we just need to redirect
    return res.redirect('/');
}


// sign-out function
module.exports.destroySession = function (req, res) {
    req.flash('success', 'You have Logged out!');
    //to log out
    req.logout
        (function (err) {
            if (err) {
                return res.redirect('/');
            }
            req.flash('success', 'You have Logged out!');
            return res.redirect('/');
        })
}




