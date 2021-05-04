const jsforce = require('jsforce')

const { ltApi, sfRestApi } = require(appRoot + '/config')

const logConnectionFound = (req) => {
  const { user, auth } = req.session.salesforce
  console.log(`Salesforce session: ${user.username} at ${auth.instanceUrl}`)
}

const logNoConnectionFound = () => {
  console.log(`No Salesforce session found.`)
}

const isAuthenticating = (req) => {
  return [
    ltApi('auth_login'),
    ltApi('auth_sfdc'),
    ltApi('auth_oauth'),
    ltApi('auth_callback')
  ].includes(req.baseUrl)
}

const foundConnection = (req) => {
  if (!req.session.salesforce) return false
  const { auth } = req.session.salesforce
  return (auth !== {} && auth !== undefined)
}

const authHelpers = {

  refreshed: (req, res, next) => {
    req.sfConn = new jsforce.Connection(req.session.salesforce.auth)
    next()
  },

  required: (req, res, next) => {
    if (!isAuthenticating(req) && !foundConnection(req))
      return res.status(403).json({ message: `You are not authenticated with Salesforce!` })
    next()
  },

  getApiVersion: async (conn) => {
    try {
      const version_list = await conn.request(`/services/data`)
      return version_list.pop()
    } catch (error) {
      console.error(error)
      return sfRestApi
    }
  }

}


module.exports = authHelpers
