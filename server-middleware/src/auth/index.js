require('dotenv').config()

const jsforce = require('jsforce'),
      redis = require('redis'),
      session = require('express-session'),
    { nanoid } = require('nanoid');

const { defaultApiVersion } = require(appRoot + '/config/app'),
      { handleError } = require(appRoot + '/src/utilities');

async function getApiVersion(sf) {
  try {
    const versionList = await sf.request('/services/data')
    return versionList.pop()
  } catch (error) {
    console.error(error)
    return defaultApiVersion
  }
}

const isAuthenticating = (req) => {
  const r = api.routes
  return [
    r['auth-login'].path,
    r['auth-sfdc'].path,
    r['auth-oauth'].path,
    r['auth-callback'].path
  ].includes(req.url)
}

const foundConnection = (req) => {
  if (!req.session.salesforce) return false
  return (req.session.salesforce !== {} && req.session.salesforce !== undefined)
}

module.exports = {

  initSession: function() {

    const RedisStore = require('connect-redis')(session)
    const redisClient = redis.createClient(process.env.REDIS_URL)

    const prodCookieSettings = {
      maxAge: (180 * 60000),
      httpOnly: true,
      secure: false, /* false for dev */
      sameSite: 'none'
    }

    const devCookieSettings = {
      maxAge: (60 * 60000)
    }

    const selectedCookieSettings = process.env.ENVIRONMENT === 'development'
      ? devCookieSettings : prodCookieSettings;

    const sessionOptions = {
      name: 'Lowtide',
      secret: process.env.SESSION_SECRET,
      proxy: true,
      cookie: selectedCookieSettings,
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      resave: false
    }

    return session(sessionOptions)

  },

  writeAuthToSession: async function(req, sf) {

    const identity = await sf.identity(),
          apiVersion = await getApiVersion(sf);

     req.session.salesforce = {
      api: apiVersion,
      auth: {
        accessToken: sf.accessToken,
        instanceUrl: sf.instanceUrl
      },
      user: {
        id: identity.user_id,
        name: identity.display_name,
        email: identity.email,
        username: identity.username
      }
    }

    req.session.deployBranch = 'master'
    req.session.socketRoom = nanoid(10)
    req.session.jobHistory = []

    return req

  },

  refresh: function(session) {
    return new jsforce.Connection(session.salesforce.auth)
  },

  required: function(req, res, next) {
    console.log(
      req.baseUrl,
      req.url,
      'isAuthenticating', isAuthenticating(req),
      'foundConnection', foundConnection(req)
    )
    if (!isAuthenticating(req) && !foundConnection(req))
      return handleError(res, { status: 403, message: 'No Salesforce authentication found.' })
    else if (!isAuthenticating(req) && foundConnection(req))
      req.sf = new jsforce.Connection(req.session.salesforce.auth)
    next()
  }

}
