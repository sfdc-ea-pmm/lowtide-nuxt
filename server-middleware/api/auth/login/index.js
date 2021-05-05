const jsforce = require('jsforce')

const { writeAuthToSession } = require(appRoot + '/src/auth'),
    { handleSuccess, handleError } = require(appRoot + '/src/utilities')

module.exports = {
  POST: async function (req, res) {
      const { username, password } = req.body
      try {
        const sf = new jsforce.Connection()
        await sf.login(username, password)
        req = await writeAuthToSession(req, sf)
        const { api, auth, user } = req.session.salesforce
        return handleSuccess(res, {
          message: `Logged in as ${user.name} at ${auth.instanceUrl} (API v${api.version})`
        })
      } catch (error) {
        return handleError(res, error)
      }
  }
}
