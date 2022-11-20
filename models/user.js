// This is the Schema of the User

const mongoose = require('mongoose');


// we have to import in this page as this page is user specific and we are suppose to use a file which is user specific and have some specific settings as well.
const multer = require('multer');
// as we will be setting the path where the file will be stored thst's why we have to import path.
const path = require('path');
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
    },
    avatar: {
        type: String
    }
},
    {
        // to keep updated the details of the users which is regulated by the mongodb which is our data base
        timestamps: true
    });



// 

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });



// static function
// .single('avatar') means only one file will be uploaded for the field name Avatar, not multiple
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;



// telling mongoose that it is a model or a collection and which schema does it reffers to
const User = mongoose.model('User', userSchema);


// weneed to export thios page
module.exports = User;


