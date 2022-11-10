// first we have to access the comments model
const Comment = require('../models/comment');
// then we have to access the post model
const Post = require('../models/post');



module.exports.create = function (req, res) {
    Post.findById(req.body.post, function (err, post) {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },
                function (err, comment) {
                    // handle the err

                    post.comments.push(comment);
                    // whenever we update something we need to call save, to save the comment in to the database
                    post.save();

                    res.redirect('/');
                }
            );
        }
    });
}

module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (comment.user == req.user.id) {
            // to identify the comment
            let postId = comment.post;
            // to delete the comment
            comment.remove();

            // as we delete a comment from a post so we have to update that post as well
            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, 
                function(err,post){
                return res.redirect('back')
            })
        }
        else{
            return res.redirect('back');
        }
    })
}