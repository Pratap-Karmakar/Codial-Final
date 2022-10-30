// so now we have to export this page and the function
module.exports.profile = function (req, res) {
    return res.end('<h1> User Profile </h1>');
}