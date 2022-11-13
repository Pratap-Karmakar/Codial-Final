// // we have to exort this page so that we can access this page in the index.js of routes
// module.exports.home = function (req, res) {
//     // console.log(req.cookies);
//     // res.cookie('user_id',25)

//     // .end means it sending directly something in the browser
//     // return res.end('<h1> Express is up for codial </h1>');

//     // this is how we reander an another page by passing it's name and the title of that rendered page

//     // this is the default home page
//     return res.render('home', {
//         title: 'Home'
//     });
// }


const Post = require('../models/post');
const User = require('../models/user');


// to save the data on the home page 
module.exports.home = async function (req, res) {
    try{
        //populate the user of each posts, this will show the whole object of each user    
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
        }
        });
        // to find all the users in the home page
        let users = await User.find({});

        return res.render('home', {
        title: "Codial | Home",
        posts: posts,
        all_users: users
        });
    }
    catch(err){
        console.log('Error', err);
        return;
    }
}

// using then
// Post.find({}).populate('comment').then();

// let posts= Post.find({}).populate('comment').exec();
// posts.then()