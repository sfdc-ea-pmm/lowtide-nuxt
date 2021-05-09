const aws = require('aws-sdk')

const { handleSuccess, handleError } = require(appRoot + '/src/utilities'),
      { awsOptions } = require(appRoot + '/config/app');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const labelSort = function(a, b) {
  if (a.template.label < b.template.label)
    return -1
  else if (a.template.label > b.template.label)
    return 1
  return 0
}

module.exports = {

  GET: async function(req, res) {

    const { deployBranch } = req.session,
          { version } = req.session.salesforce.api,
          fileName = `${awsOptions.folders.manifest}${deployBranch}.json`;

    try {

      const manifestObj = await s3
        .getObject({ Bucket: awsOptions.name, Key: fileName })
        .promise()

      const manifest = JSON.parse(manifestObj.Body.toString('utf-8'))

      const formattedManifest = manifest
        .sort(labelSort)
        .map(item => {
          item.template.deployable = parseInt(item.template.api_version) <= version
          return item.template
        })

      handleSuccess(res, { data: formattedManifest })

    } catch (error) {
      handleError(res, error)
    }

  }

}
