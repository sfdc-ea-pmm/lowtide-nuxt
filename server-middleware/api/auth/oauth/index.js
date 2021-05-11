require('dotenv').config()

const jsforce = require('jsforce')

module.exports = {

  GET: function (req, res) {

    const oauthSettings = new jsforce.OAuth2({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.API_URL + api.routes['auth-callback'].path
    })

    res.redirect(oauthSettings.getAuthorizationUrl())

  }

}
