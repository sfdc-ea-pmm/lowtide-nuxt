const org = require(appRoot + '/src/org'),
      { resolve } = require('../helpers');

const orgOperations = {

  getFolders: async(req, res) =>
    resolve(res, org.getFolders(req.sfConn)),

  getFolder: async(req, res) =>
    resolve(res, org.getFolder(req.sfConn, req.params.id)),

  getDatasets: async(req, res) =>
    resolve(res, org.getDatasets(req.sfConn)),

  getDataset: async(req, res) =>
    resolve(res, org.getDataset(req.sfConn, req.params.id)),

  getDataflows: async(req, res) =>
    resolve(res, org.getDataflows(req.sfConn, req.params.id)),

  getDataflow: async(req, res) =>
    resolve(res, org.getDataflow(req.sfConn, req.params.id)),

  getDataflowsTimeshift: async(req, res) =>
    resolve(res, org.getTimeshiftDataflows(req.sfConn)),

  getDataflowCurrentVersion: async(req, res) =>
    resolve(res, org.getDataflowAndCurrentVersion(req.sfConn, req.params.id)),

  getDataflowJson: async(req, res) =>
    resolve(res, org.downloadDataflowJson(req.sfConn, req.params.id)),

  deleteDataflow: async(req, res) =>
    resolve(res, org.deleteDataflow(req.sfConn, req.params.id)),

  // getTemplates: async(req, res) => ,
  //
  // getTemplate: async(req, res) => ,
  //
  // deleteTemplate: async(req, res) => ,
  //
  // downloadTemplate: async(req, res) => ,
  //
  // createTemplateFromApp: async(req, res) => ,
  //
  // updateTemplateFromApp: async(req, res) => ,

}



//
// const getOrgFolders = async (req, res) => {
//
//   try {
//     const conn = auth.refreshConnection(req.session)
//     const result = await org.getFolders(conn)
//     res.status(200).json(result)
//   } catch (e) {
//     console.error(e)
//     res.status(500).json(e.message)
//   }
//
// }
//
// const getOrgDatasets = async (req, res) => {
//
//   try {
//     const conn = auth.refreshConnection(req.session)
//     const result = await org.getDatasets(conn, req.params.folder_id)
//     res.status(200).json(result)
//   } catch (e) {
//     console.error(e)
//     res.status(500).json(e.message)
//   }
//
// }
//
// const getOrgDataflows = async (req, res) => {
//
//   try {
//     const conn = auth.refreshConnection(req.session)
//     const result = await org.getDataflows(conn, req.params.folder_id)
//     res.status(200).json(result)
//   } catch (e) {
//     console.error(e)
//     res.status(500).json(e.message)
//   }
//
// }
//
// const getOrgTsDataflows = async (req, res) => {
//   try {
//     const conn = auth.refreshConnection(req.session)
//     const result = await org.getTsDataflows(conn)
//     res.status(200).json(result)
//   } catch (e) {
//     console.error(e)
//     res.status(500).json(e.message)
//   }
// }
//
// const getCurrentDataflowVersion = async (req, res) => {
//
//   try {
//     const conn = auth.refreshConnection(req.session)
//     const result = await org.getSingleDataflow(conn, req.params.dataflow_id)
//     res.status(200).json(result)
//   } catch (e) {
//     console.error(e)
//     res.status(500).json(e.message)
//   }
//
// }
//
// const deleteDataflow = async (req, res) => {
//   try {
//     const conn = auth.refreshConnection(req.session)
//     const result = await org.deleteDataflow(conn, req.params.dataflow_id)
//     res.status(200).json(result)
//   } catch (e) {
//     console.error(e)
//     res.status(500).json(e.message)
//   }
// }
//
// const getOrgTemplates = async (req, res) => {
//
//   try {
//     const conn = auth.refreshConnection(req.session)
//     const result = await org.getTemplates(conn)
//     res.status(200).json(result)
//   } catch (e) {
//     console.error(e)
//     res.status(500).json(e.message)
//   }
//
// }
//
// const getSingleOrgTemplate = async (req, res) => {
//
//   try {
//     const conn = auth.refreshConnection(req.session)
//     const result = await org.getSingleTemplate(conn, req.params.template_id)
//     res.status(200).json(result)
//   } catch (e) {
//     console.error(e)
//     res.status(500).json(e.message)
//   }
//
// }
//
// const deleteSingleOrgTemplate = async (req, res) => {
//
//   try {
//     const conn = auth.refreshConnection(req.session)
//     const result = await org.deleteSingleTemplate(conn, req.params.template_id)
//     res.status(200).json(result)
//   } catch (e) {
//     console.error(e)
//     res.status(500).json(e.message)
//   }
//
// }
//
// const downloadTemplate = async (req, res) => {
//   try {
//     const conn = auth.refreshConnection(req.session)
//     const stream = await org.downloadSingleTemplate(conn, req.body.template)
//     res.attachment(`${req.body.template}.zip`)
//     stream.pipe(res)
//   } catch (e) {
//     console.error(e)
//     res.status(500).json(e.message)
//   }
//
// }
//
// const createTemplateFromApp = async (req, res) => {
//
//   try {
//
//     const params = {
//       session: req.session,
//       folder_id: req.body.folder_id,
//       dataflow_id: req.body.dataflow_id
//     }
//
//     const conn = auth.refreshConnection(req.session)
//     const result = await org.createTemplate(conn, params)
//
//     res.status(200).json(result)
//
//   } catch (e) {
//     console.error(e)
//     res.status(500).json(e.message)
//   }
//
// }
//
// const updateTemplateFromApp = async (req, res) => {
//
//   try {
//
//     const params = {
//       session: req.session,
//       folder_id: req.body.folder_id,
//       dataflow_id: req.body.dataflow_id
//     }
//
//     const conn = auth.refreshConnection(req.session)
//     const result = await org.updateTemplate(conn, params)
//
//     res.status(200).json(result)
//
//   } catch (e) {
//     console.error(e)
//     res.status(500).json(e.message)
//   }
//
// }
//
// const refreshDatasets = async (req, res) => {
//
//   // implement with bull
//
// }
//
// const runDataflow = async (req, res) => {
//
//   const params = {
//     session: req.session,
//     dataflow_id: req.params.dataflow_id
//   }
//
//   // implement with bull

// }

module.exports = orgOperations

// module.exports = {
//   getOrgFolders: getOrgFolders,
//   getOrgDatasets: getOrgDatasets,
//   getOrgDataflows: getOrgDataflows,
//   getOrgTsDataflows: getOrgTsDataflows,
//   deleteDataflow: deleteDataflow,
//   getCurrentDataflowVersion: getCurrentDataflowVersion,
//   getOrgTemplates: getOrgTemplates,
//   getSingleOrgTemplate: getSingleOrgTemplate,
//   downloadTemplate,
//   deleteSingleOrgTemplate: deleteSingleOrgTemplate,
//   createTemplateFromApp: createTemplateFromApp,
//   updateTemplateFromApp: updateTemplateFromApp,
//   refreshDatasets: refreshDatasets,
//   runDataflow: runDataflow
// }
