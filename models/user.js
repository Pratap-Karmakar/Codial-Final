// This is the Schema of the User

const mongoose = require('mongoose');
const multer = require('multer');



// we have to import in this page as this page is user specific and we are suppose to upe a file which is user specific and have some specific settings as well.
const multer=require('multer');
// as we will be setting the path where the file will be stored thst's why we have to import path.
const path=require('path');
//  and we have to specify which path
const AVATAR_PATH = path.join('/uploads/users/avatars');



const userSchema = new mongoose.Schema({
    // ********************* here String's  'S'   should be in capital, otherwise the cose will not work **************************
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {

    // to keep updated the details of the users which is regulated by the mongodb which is our data base
    timestamps: true
});



// telling mongoose that it is a model or a collection and which schema does it reffers to
const User = mongoose.model('User', userSchema);


// weneed to export thios page
module.exports = User;



// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     }
// }, {
//     timestamps: true
// });


// const User = mongoose.model('User', userSchema);

// module.exports = User;