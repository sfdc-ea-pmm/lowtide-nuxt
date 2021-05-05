const { formatTemplateResponse } = require(appRoot + '/src/template'),
      { handleError, handleSuccess } = require(appRoot + '/src/utilities')

module.exports = {

  GET: async function(req, res) {
    try {
      const result = await req.sf.sobject('WaveTemplate').retrieve(req.params.id)
      handleSuccess(res, { data: formatTemplateResponse(result) })
    } catch (error) {
      handleError(res, error)
    }
  },

  DELETE: async function(req, res) {
    try {
      const result = await req.sf.sobject('WaveTemplate').destroy(req.params.id)
      handleSuccess(res, { data: formatTemplateResponse(result) })
    } catch (error) {
      handleError(res, error)
    }
  }

}
