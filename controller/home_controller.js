// we have to exort this page so that we can access this page in the index.js of routes
module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id',25)

    // .end means it sending directly something in the browser
    // return res.end('<h1> Express is up for codial </h1>');

    // this is how we reander an another page by passing it's name and the title of that rendered page

    // this is the default home page
    return res.render('home', {
        title: 'Home'
    });
}