const { handleSuccess } = require(appRoot + '/src/utilities')

module.exports = {

  GET: async function(req, res) {

    let result

    try {
      await req.sf.logout()
      result = `Logged out`
    } catch (error) {
      console.error(error)
      result = `Log out failed`
    } finally {
      req.session.destroy()
      return handleSuccess(res, { message: `${result}. Session destroyed.` })
    }

  }

}
