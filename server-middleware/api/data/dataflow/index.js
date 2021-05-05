const { handleError, handleSuccess } = require(appRoot + '/src/utilities')

module.exports = {

  GET: async function(req, res) {
    try {
      const result = await req.sf.sobject('Dataflow').find()
      handleSuccess(res, { data: result })
    } catch (error) {
      handleError(res, error)
    }
  },

  POST: async function(req, res) {
    try {

      const {
        DeveloperName,
        MasterLabel,
        State = 'Active',
        DataflowDefinition = {}
      } = req.body

      const dataflowResult = await req.sf.sobject('Dataflow').create({
        DeveloperName,
        MasterLabel,
        State
      })

      const versionResult = await req.sf.sobject('DataflowVersion').create({
        DataflowId: dataflowResult.id,
        DataflowDefinition
      })

      const assignResult = await req.sf.sobject('Dataflow').update({
        Id: dataflowResult.Id,
        CurrentId: versionResult.Id
      })

    } catch (error) {
      handleError(res, error)
    }
  }

}
