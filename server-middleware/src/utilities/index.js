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

    console.log("Setting up socket server...")

    const socketCorsConfig = { cors: { origin: '*' } }

    global.socket = socketio(server, socketCorsConfig)

    socket.use(socketSession(session))

    socket.on('connection', socket => {
      socket.on('subscribeToJobUpdates', (providedId) => {
        const sessionId = providedId || socket.handshake.session.socketRoom
        console.log(`Socket client subscribed to ${sessionId}.`)
        socket.join(sessionId)
      })
    })

    console.log("Socket server configured. Listening for `subscribeToJobUpdates` events.")

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
  },
  
  uploadFromCSV(files){
    const filesEntries = Object.entries(files);
    const base64 = [];

    const myString = [];
    filesEntries.forEach(value => {
        base64.push(value[1].data.toString("base64"));
        myString.push(value[1].data.toString("utf8"));
    });

    const rows = [];
    myString.forEach(value => {
        rows.push(value.split('\r\n'));
    });
    
    const fields = [];
    const values = [];

    rows.forEach(value => {
        fields.push(value[0].split(','));
        values.push(value[1].split(','));
    });

    return {fields, values, base64};
  },

  uploadFromJSON(json){
    const columnNames = json.dataset.columnNames;
    const fields = [columnNames];
    const values = [];
    const firstRow = [];
    columnNames.forEach(field => {
        firstRow.push(json.rows[0][field]);
    });
    values.push(firstRow);

    const names = [json.dataset.name];

    const fieldsString = columnNames.join(',');
    const rows = [];
    const base64 = [];
    const csvTmp = [fieldsString];
    let csv = [];
    let tmp;
    json.rows.forEach((value, i) => {
      tmp = [];
      columnNames.forEach(field => {
        tmp.push(json.rows[i][field]);
      });
      rows.push(tmp);
    });
    rows.forEach(row => {
      csvTmp.push(row.join(','));
    });
    csv = csvTmp.join('\r\n');
    base64.push(Buffer.from(csv).toString("base64"));
    return {fields, values, names, base64};
  }

}

module.exports = utilityMethods
