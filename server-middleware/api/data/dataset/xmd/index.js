const { handleError, handleSuccess } = require(appRoot + '/src/utilities')
const { gatherDateFields } = require(appRoot + '/src/xmd')

module.exports = {
  POST: async function(req, res) {
    try {
      const result = await gatherDateFields(req.session, req.body)
      handleSuccess(res, { data: result })
    } catch (error) {
      handleError(res, error)
    }
  }
}
