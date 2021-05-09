const { handleError, handleSuccess } = require(appRoot + '/src/utilities')

module.exports = {

  GET: async function(req, res) {
    try {
      const dataflow = await req.sf.sobject('Dataflow').retrieve(req.params.id),
            dataflowVersion = await req.sf.sobject('DataflowVersion').retrieve(dataflow.CurrentId);
      handleSuccess(res, { data: { dataflow: dataflow, currentDataflowVersion: dataflowVersion } })
    } catch (error) {
      handleError(res, error)
    }
  },

  DELETE: async function(req, res) {
      try {
        const result = await req.sf.sobject('Dataflow').destroy(req.params.id)
        handleSuccess(res, { data: result })
      } catch (error) {
        handleError(res, error)
      }
  }

}
