const jsforce = require('jsforce')

const auth = require(appRoot + '/src/auth'),
    { handleError } = require(appRoot + '/src/utilities');

module.exports = {

  GET: async function (req, res) {

    const oauthSettings = new jsforce.OAuth2({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.HOSTNAME + api.routes['auth-callback'].path
    })

    const sf = new jsforce.Connection({ oauth2: oauthSettings })

    try {

      await sf.authorize(req.query.code)
      await auth.writeAuthToSession(req, sf)

      const nextUrl = process.env.ENVIRONMENT  === 'development'
        ? '/' : process.env.FRONTEND_HOSTNAME + '/deploy';

      return res.redirect(nextUrl)

    } catch (error) {
      return handleError(res, error)
    }

  }

}
