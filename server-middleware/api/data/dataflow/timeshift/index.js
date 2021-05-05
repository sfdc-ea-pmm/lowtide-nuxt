const { handleError, handleSuccess } = require(appRoot + '/src/utilities')

module.exports = {
  GET: async function(req, res) {
    try {
      const result = await req.sf.sobject('Dataflow').find({ DeveloperName: { $like: 'LTTS_TSDF%'} })
      const tsDataflows = result.filter(d => !d.DeveloperName.includes('LTTS_TSDF_PRIMER'))
      handleSuccess(res, { data: tsDataflows })
    } catch (error) {
      handleError(res, error)
    }
  }
}
