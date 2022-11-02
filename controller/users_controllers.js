// to import the user's schema/details
const User = require('../models/user');

// module.exports.profile=function(req,res){
//     return res.render('user_profile',{
//         title: "User Profile"
//     })
// }



// so now we have to export this page and the function
module.exports.profile = function (req, res) {
    console.log('line 123', req.cookies);
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err,user){
            if(user){
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                })
            }
            else{
                return res.redirect('/users/sign-in');
            }
        });
    }
    else{
        return res.redirect('/users/sign-in');
    }
}





// to render the sign_up page
module.exports.signUp = function (req, res) {
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

    })
}



// to render the sign_in page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: 'Sign In'
    })
}
// to get the sign_in data
module.exports.createSession = function (req, res) {
    // find the user
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Error in finding user in Signing In');
            return;
        }
        // handle user found
        if (user) {
            // if the user is found and password doesn't match
            if (user.password != req.body.password) {
                console.log('line 75', req.body);
                return res.redirect('back');
            }
            // if the user is found thend send it to the profile page
            res.cookie('user_id', user.id)
            // redirect it to the profile page
            return res.redirect('/users/profile');
        }
        else {
            // handle user not found
            return res.redirect('back');
        }
    })

}












// const User = require('../models/user');


// module.exports.profile = function(req, res){
//     if (req.cookies.user_id){
//         User.findById(req.cookies.user_id, function(err, user){
//             if (user){
//                 return res.render('user_profile', {
//                     title: "User Profile",
//                     user: user
//                 })
//             }else{
//                 return res.redirect('/users/sign-in');

//             }
//         });
//     }else{
//         return res.redirect('/users/sign-in');

//     }


    
// }


// // render the sign up page
// module.exports.signUp = function(req, res){
//     return res.render('user_sign_up', {
//         title: "Codeial | Sign Up"
//     })
// }


// // render the sign in page
// module.exports.signIn = function(req, res){
//     return res.render('user_sign_in', {
//         title: "Codeial | Sign In"
//     })
// }

// // get the sign up data
// module.exports.create = function(req, res){
//     if (req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }

//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){console.log('error in finding user in signing up'); return}

//         if (!user){
//             User.create(req.body, function(err, user){
//                 if(err){console.log('error in creating user while signing up'); return}

//                 return res.redirect('/users/sign-in');
//             })
//         }else{
//             return res.redirect('back');
//         }

//     });
// }


// // sign in and create a session for the user
// module.exports.createSession = function(req, res){

//     // steps to authenticate
//     // find the user
//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){console.log('error in finding user in signing in'); return}
//         // handle user found
//         if (user){

//             // handle password which doesn't match
//             if (user.password != req.body.password){
//                 return res.redirect('back');
//             }

//             // handle session creation
//             res.cookie('user_id', user.id);
//             return res.redirect('/users/profile');

//         }else{
//             // handle user not found

//             return res.redirect('back');
//         }


//     });

 

    

    
// }