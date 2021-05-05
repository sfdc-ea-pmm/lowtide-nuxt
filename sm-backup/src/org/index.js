const config = require(appRoot + '/config')

const formatTemplateResponse = function (template) {

  const templateInfoAsBuffer = Buffer.from(template.TemplateInfo, 'base64'),
        templateInfoAsString = templateInfoAsBuffer.toString('utf-8');
        data = JSON.parse(templateInfoAsString);

  const apiVersion = data.assetVersion.toString() + '.0',
        templateDashboards = data.dashboards.map(d => d.label),
        templateDatasets = data.externalFiles
          .filter(d => d.type === 'CSV')
          .map(d => d.label);

  return {
    sObjectId: template.Id,
    sObjectModified: template.LastModifiedDate,
    apiName: data.name,
    apiVersion: apiVersion,
    label: data.label,
    description: data.description,
    version: data.releaseInfo.templateVersion,
    tags: data.tags,
    dashboards: templateDashboards,
    csvDatasets: templateDatasets
  }

}

const formatTemplateCreate = function (folderId, dataflowId) {
  const reqBody = { folderSource: { id: folderId }}
  if (dataflowId) reqBody. dataflow = { id: dataflowId }
  return reqBody
}

const orgOperations = {

  getFolders: (conn) => {
    return conn.sobject('Folder').find({ Type: 'Insights' })
  },

  getDatasets: (conn, folderId) => {
    return conn.sobject('EdgeMart').find({ FolderId: folderId })
  },

  getDataflows: (conn, folderId) =>  {
    return conn.sobject('Dataflow').find({ FolderId: folderId })
  },

  getFolder: (conn, folderId) => {
    return conn.sobject('Folder').retrieve(folderId)
  },

  getDataset: (conn, datasetId) => {
    return conn.sobject('EdgeMart').retrieve(datasetId)
  },

  getDataflow: (conn, dataflowId) => {
    return conn.sobject('Dataflow').retrieve(dataflowId)
  },

  getTimeshiftDataflows: async (conn) => {
    const tsDataflows = await conn.sobject('Dataflow').find({ DeveloperName: { $like: 'LTTS_TSDF%'} })
    return tsDataflows.filter(d => !d.DeveloperName.includes('LTTS_TSDF_PRIMER'))
  },

  getDataflowAndCurrentVersion: async (conn, dataflowId) => {
    const dataflow = await conn.sobject('Dataflow').retrieve(dataflowId),
          dataflowVersion = await conn.sobject('DataflowVersion').retrieve(dataflow.CurrentId);
    return { dataflow: dataflow, currentDataflowVersion: dataflowVersion }
  },

  downloadDataflowJson: (conn, dataflowId) => {
    return conn.sobject('DataflowVersion').find({ DataflowId: dataflowId })
  },

  deleteDataflow: (conn, dataflowId) => {
    return conn.sobject('Dataflow').destroy(dataflowId)
  },

  getTemplates: async (conn) => {
    const orgTemplates = await conn.sobject('WaveTemplate').find({ TemplateType: 'App' })
    return orgTemplates.map(formatTemplateResponse)
  },

  getTemplate: async (conn, templateId) => {
    const orgTemplate = await conn.sobject('WaveTemplate').retrieve(templateId)
    return formatTemplateResponse(orgTemplate)
  },

  downloadTemplate: async (conn, mdpName) => {
    return await conn.metadata.retrieve({ packageNames: [ mdpName ] }).stream()
  },

  deleteTemplate: (conn, templateId) => {
    return conn.sobject('WaveTemplate').destroy(templateId)
  },

  createTemplate: (conn, params) => {
    const {session, folderId, dataflowId } = params
    const reBody = formatTemplateCreate(folderId, dataflowId)
    return conn.requestPost(config.sfApi(session, "wave_templates"), reqBody)
  },

  updateTemplate: (conn, params) => {
    const {session, folderId, dataflowId } = params
    const reBody = formatTemplateCreate(folderId, dataflowId)
    return conn.requestPut(`${config.sfApi(session, "wave_templates")}/${templateId}`, reqBody)
  },

  createDataflow(conn, dataflowJson) {
    return conn.sobject('Dataflow').create(dataflowJson)
  },

  createDataflowVersion(conn, dataflowVersionJson) {
    return conn.sobject('DataflowVersion').create(dataflowVersionJson)
  },

  assignDataflowVersion(conn, dataflowId, dataflowVersionId) {
    return conn.sobject('Dataflow').update({ Id: dataflowId, CurrentId: dataflowVersionId })
  },

  runDataflow(conn, session, dataflowId) {
    return conn.requestPost(config.sfApi(session, "wave_dataflowjobs"), {
      dataflowId: dataflowId, command: 'start'
    })
  }

}

module.exports = orgOperations
