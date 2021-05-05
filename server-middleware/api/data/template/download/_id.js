const { formatTemplateResponse } = require(appRoot + '/src/template'),
      { handleError } = require(appRoot + '/src/utilities');

module.exports = {

  /*

    Note: when this fails on timeout, it crashes the server. Move it into
    queueing framework and when it fails, find a way to fail gracefully.

  */

  GET: async function(req, res) {

    try {

      const template = await req.sf.sobject('WaveTemplate').retrieve(req.params.id)

      const retrieveOptions = {
        apiVersion: req.session.salesforce.api.version,
        singlePackage: true,
        unpackaged: {
          types: [
            {
              'members': [ template.DeveloperName ],
              'name': 'WaveTemplateBundle'
            },
            {
              'members' : [
                'analytics_icon',
                'einstein_scene',
                'demo_template_guide_0'
              ],
              'name' : 'StaticResource'
            }
          ]
        }
      }

      req.sf.metadata.pollInterval = 5000
      req.sf.metadata.pollTimeout = 300000

      req.setTimeout(300000)
      res.attachment(`${template.DeveloperName}.zip`)

      const retrieveOperation = req.sf.metadata.retrieve(retrieveOptions)

      retrieveOperation.stream().pipe(res)

    } catch (error) {
      handleError(res, error)
    }

  }
}
