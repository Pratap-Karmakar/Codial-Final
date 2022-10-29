// we have to exort this page so that we can access this page in the index.js of routes
module.exports.home=function(req,res){
    return res.end('<h1> Express is up for codial </h1>');
}