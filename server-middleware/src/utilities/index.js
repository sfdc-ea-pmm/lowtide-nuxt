const path = require('path'),
      cors = require('cors'),
      socketio = require('socket.io'),
      socketSession = require('express-socket.io-session');

const utilityMethods = {

  /*

    Yes. I'm polluting the global namespace with really common variable
    names like api, socket, jobs. Shut up, it's my code.

  */

  setGlobals(root, server) {

    global.appRoot = path.resolve(root)

    const { corsOptions } = require(appRoot + '/config/app'),
          { initApi, required } = require('../router'),
          { initSession } = require('../auth'),
          jobEvents = require('../events');

    global.api = initApi()
    global.jobs = jobEvents

    const allowedClients = cors(corsOptions), session = initSession();

    // global.socket = socketio(server)
    //
    // socket.use(socketSession(session))
    //
    // socket.on('connection', socket => {
    //   socket.on('subscribeToJobUpdates', (providedId) => {
    //     const sessionId = providedId || socket.handshake.session.socketRoom
    //     console.log(`Socket client subscribed to ${sessionId}.`)
    //     socket.join(sessionId)
    //   })
    // })

    return { allowedClients, session }

  },

  sfApi(req) {
    return req.session.salesforce.api.url
  },

  handleSuccess(res, { status = 200, message, data }) {
    return res.status(status).json({ message: message, data: data })
  },

  handleNotFound(res, { status = 404, message = 'Requested resource not found.', data }) {
    return res.status(status).json({ message: message, data: data })
  },

  handleError(res, error) {
    console.error(error)
    return res.status(error.statusCode || 500).json({ message: error.message })
  }

}

module.exports = utilityMethods
