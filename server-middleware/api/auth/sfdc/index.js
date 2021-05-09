const jsforce = require('jsforce')

const auth = require(appRoot + '/src/auth'),
    { handleSuccess, handleError } = require(appRoot + '/src/utilities');

module.exports = {

  POST: async function (req, res) {

    const sf = new jsforce.Connection(req.body)

    try {
      const loginMessage = await auth.writeAuthToSession(req, sf)
      handleSuccess(res, { message: loginMessage })
    } catch (error) {
      handleError(res, error)
    }

  }

}
