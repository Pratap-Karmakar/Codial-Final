// so now we have to export this page and the function
module.exports.profile = function (req, res) {
    return res.render('user_profile',{
        title:'User Profile'
    })
}







// to render the sign_up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up', {
        title: 'Sign Up'
    })
}
// to get the sign_up data
module.exports.create=function(req,res){

}



// to render the sign_in page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:'Sign In'
    })
}
// to get the sign_in data
module.exports.createSession=function(req,res){

}