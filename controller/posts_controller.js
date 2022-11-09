const Post = require('../models/post')
// importing the Comment
const Comment= require('../models/comment');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err)
        {console.log('Error in creating a post');
        return;
        }

        return res.redirect('back');
    });
}


// to delete post and all the comments attacthed to that post as well

module.exports.destroy= function(req,res){
    Post.findById(req.params.id, function(err,post){
        // it will allow the specific user to delete that posts which is written by himself only, so for that no one can allow to delete other's posts
        // .id means converting the object id in to string, this is the inbuilt function of mongoose
        if(post.user == req.user.id){
            // remove the post
            post.remove();

            // delete the comments
            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back')
        }
    })
}