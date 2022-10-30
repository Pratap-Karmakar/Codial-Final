// This is the Schema of the User

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: string,
        required: true,
        unique: true
    },
    name: {
        type: string,
        required: true
    },
    password: {
        type: string,
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