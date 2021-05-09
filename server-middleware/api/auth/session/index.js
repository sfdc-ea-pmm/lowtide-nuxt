const { handleSuccess } = require(appRoot + '/src/utilities')

module.exports = {
  GET: function(req, res) {
    handleSuccess(res, { data: req.session })
  }
}
