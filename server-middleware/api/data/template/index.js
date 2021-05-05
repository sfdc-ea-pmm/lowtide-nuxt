const { getTemplateEndpoint, formatTemplateResponse, formatTemplateCreate }
  = require(appRoot + '/src/template')

const { handleError, handleSuccess, sfApi }
  = require(appRoot + '/src/utilities')

module.exports = {

  GET: async function(req, res) {
    try {
      const result = await req.sf.sobject('WaveTemplate').find({ TemplateType: 'App' })
      const orgTemplates = result.map(formatTemplateResponse)
      handleSuccess(res, { data: orgTemplates })
    } catch (error) {
      handleError(res, error)
    }
  },

  POST: async function(req, res) {
    const { folderId, dataflowId } = params
    const reqBody = formatTemplateCreate(folderId, dataflowId)
    return req.sf.requestPost(getTemplateEndpoint(req), reqBody)
  },

  PUT: async function(req, res) {
    const { folderId, dataflowId, templateId } = params
    const reqBody = formatTemplateCreate(folderId, dataflowId)
    return req.sf.requestPut(getTemplateEndpoint(req, templateId), reqBody)
  }

}
