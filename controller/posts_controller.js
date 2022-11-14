const Post = require('../models/post')
// importing the Comment
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });


        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            })
        }


        req.flash('success', 'Post published!');
        return res.redirect('back');
    }
    catch (err) {
        req.flash('error', 'err');
        return res.redirect('back');
    }

}


// to delete post and all the comments attacthed to that post as well

module.exports.destroy = async function (req, res) {
    let post = await Post.findById(req.params.id)
    try {
        if (post.user == req.user.id) {
            // to delete the post
            post.remove();

            // to delete the comments
            await Comment.deleteMany({ post: req.params.id });

            req.flash('success', 'Post and associated comments delete!');
            return res.redirect('back');
        }
        else {
            req.flassh('error', 'You can not delete this post!');
            return res.redirect('back');
        }
    }
    catch (err) {
        req.flash('error', 'err');
        return res.redirect('back');
    }

}