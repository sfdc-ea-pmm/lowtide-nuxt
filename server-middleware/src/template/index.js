const { sfApi } = require('../utilities')

module.exports = {

  formatTemplateResponse: function (template) {

    const templateInfoAsBuffer = Buffer.from(template.TemplateInfo, 'base64'),
          templateInfoAsString = templateInfoAsBuffer.toString('utf-8');
          data = JSON.parse(templateInfoAsString);

    const apiVersion = data.assetVersion.toString() + '.0',
          templateDashboards = data.dashboards.map(d => d.label),
          templateDatasets = data.externalFiles
            .filter(d => d.type === 'CSV')
            .map(d => d.label);

    return {
      id: template.Id,
      name: data.name,
      label: data.label,
      description: data.description,
      apiVersion: apiVersion,
      version: data.releaseInfo.templateVersion,
      LastModifiedDate: template.LastModifiedDate,
      tags: data.tags,
      dashboards: templateDashboards,
      csvDatasets: templateDatasets
    }

  },

  formatTemplateCreate: function (folderId, dataflowId) {
    const reqBody = { folderSource: { id: folderId }}
    if (dataflowId) reqBody. dataflow = { id: dataflowId }
    return reqBody
  },

  getTemplateEndpoint: function (req, templateId) {
    const basePath = sfApi(req) + '/wave/templates'
    return templateId ? `${basePath}/${templateId}` : basePath
  }

}
