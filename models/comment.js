
// this is the comment schema

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // comment belongs to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
}, {
    timestamps: true
});



// we need to tell that this is going to be a model
const Comment = mongoose.model('Comment', commentSchema);

//export this page
module.exports = Comment;

