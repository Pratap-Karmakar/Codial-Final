
// This is the schema of the Posts

const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // User is the schema which we are reffering to
        ref: 'User'
    },
    // include the arra of IDs of all comments in this post schema itself
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
},
    {
        timestamps: true
    }
);

// telling the app that this is going to be a model in the database
const Post = mongoose.model('Post', postSchema);

// now we need to export this page 
module.exports = Post;