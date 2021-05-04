const mongoose = require("mongoose")

const utilityMethods = {

  bodyHasField(req, fieldName) {
    return (req.body[fieldName] && req.body[fieldName] !== '')
  },

  connectToDb() {
    const dbUri = process.env.MONGODB_URI,
          dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

    mongoose.connect(dbUri, dbOptions)
      .then(this.addTimestamp('Connected to database.'))
      .catch(console.error)
  },

  logAuth(conn, userInfo) {
    console.log("Successful Authorization:", conn.instanceUrl)
    console.log("User ID:", userInfo.id)
    console.log("Org ID:", userInfo.organizationId)
    console.log("Access Token: " + conn.accessToken)
  },

  async resolve(res, fn) {
    try {
      return res.status(200).json(await fn)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message })
    }
  }

}

module.exports = utilityMethods
