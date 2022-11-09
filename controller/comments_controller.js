// first we have to access the comments model
const Comment=require('../models/comment');
// then we have to access the post model
const Post=require('../models/post');



module.exports.create=function(req,res){
    Post.findById(req.body.post, function(err,post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },
            function(err,comment){
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