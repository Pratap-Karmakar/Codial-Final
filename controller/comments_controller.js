// first we have to access the comments model
const Comment = require('../models/comment');
// then we have to access the post model
const Post = require('../models/post');



module.exports.create = async function (req, res) {
    try{
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            // whenever we update something we need to call save, to save the comment in to the database
            post.save();

            req.flash('success', 'Post published!');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('Error', 'err');
        return res.redirect('back');
    }
}

module.exports.destroy = async function (req, res) {
    try{
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            // to identify the comment
            let postId = comment.post;
            // to delete the comment
            comment.remove();

            // as we delete a comment from a post so we have to update that post as well
            let post = Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }); 

            req.flash('success', 'Comment deleted!');
            return res.redirect('back');
    
        }
        else{
            req.flash('error','err');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('Error','err');
        return;
    }
}