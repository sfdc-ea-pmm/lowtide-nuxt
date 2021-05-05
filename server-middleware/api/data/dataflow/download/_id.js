const { handleError } = require(appRoot + '/src/utilities')

module.exports = {
  GET: async function(req, res) {
    try {
      const dataflow = await req.sf.sobject('Dataflow').retrieve(req.params.id),
            dataflowVersion = await req.sf.sobject('DataflowVersion').retrieve(dataflow.CurrentId),
            reformatJson = JSON.stringify(JSON.parse(dataflowVersion.DataflowDefinition), null, 2);
      res.attachment(`${dataflow.DeveloperName}.json`)
      return res.send(reformatJson)
    } catch (error) {
      handleError(res, error)
    }
  }
}
