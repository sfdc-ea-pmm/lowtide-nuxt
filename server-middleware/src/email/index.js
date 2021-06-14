
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'romario.test01@gmail.com',
        pass: 'Romario.test'
    }
});
module.exports = {
    sendEmail(mailOptions) {
        transporter.sendMail(mailOptions, function(error, info){
            if (error){
                console.log(error);
            } else {
                console.log("Email sent.");
            }
        });
    }
};