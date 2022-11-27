const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');



let trsnsporter = nodemailer.createTransport({
    service: 'gmail',
    // gmail SMTP ssetting
    host: 'smtp.gmail.com',
    // SMTP over SSL/TSL works over port 587
    port: 587,
    secure: false,
    auth: {
        user: 'pratap2501.pk',
        password: 'Gmail@991866'
    }
});


let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err,template){
            if(err){
                
            console.log('Error in rendering template');
            return;
            }
            else{
                mailHTML= template;
            }
        }        
    )
    return mailHTML;
}



module.exports= {
    transporter: transporter,
    renderTemplate: renderTemplate
}
