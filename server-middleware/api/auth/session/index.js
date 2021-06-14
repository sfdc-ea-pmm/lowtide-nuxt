const { handleSuccess } = require(appRoot + '/src/utilities')
//const { sendEmail } = require(appRoot + '/src/email')

module.exports = {
  GET: function(req, res) {
    /*
    var mailOptions = {
      from: 'romario.test01@gmail.com',
      to: 'romariosc15@outlook.com',
      subject: 'Correo de prueba',
      text: 'Contenido del email de prueba.',
      //html: "<b>Hello world?</b>",
    };
    //sendEmail(mailOptions)
    */
    handleSuccess(res, { data: req.session })
  }
}