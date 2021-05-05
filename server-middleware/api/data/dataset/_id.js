const { handleError, handleSuccess } = require(appRoot + '/src/utilities')

module.exports = {
  GET: async function(req, res) {
    try {
      const result = await req.sf.sobject('Edgemart').retrieve(req.params.id)
      handleSuccess(res, { data: result })
    } catch (error) {
      handleError(res, error)
    }
  }
}
