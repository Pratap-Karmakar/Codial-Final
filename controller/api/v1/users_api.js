// it's router is user.js which is inside the routes > api > v1 


const User=require('../../../models/user');
const jwt=require('jsonwebtoken');



module.exports.createSession = async function (req, res) {
    try{
        let user= await User.findOne({
            email: req.body.email
        })
        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid Username or Password"
            });
        }
        if(user){
            return res.json(200, {
                message: "Sign in successful, here is your token, please keep it safe!",
                data:{
                    // codial is the key which we've seted in the passport-jwt-strategy
                    token: jwt.sign(user.toJSON(), 'codial', {expiresIn: '10000'})
                }
            })
        }
    }
    catch(err){
        console.log('*******', err);
        return res.json(500, {
            message: "Internal server error!"
        });
    }
}