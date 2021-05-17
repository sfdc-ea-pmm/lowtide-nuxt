const aws = require('aws-sdk')

const { handleSuccess, handleError } = require(appRoot + '/src/utilities'),
      { awsOptions } = require(appRoot + '/config/app');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

module.exports = {

  GET: async function(req, res) {

    try {

      const { deployBranch } = req.session,
            { api_name } = req.params;

      const fileName = `${api_name}.zip`,
            subfolderKey = `${awsOptions.folders[deployBranch]}${fileName}`

      res.attachment(fileName)

      const zipStream = s3
        .getObject({ Bucket: awsOptions.name, Key: subfolderKey })
        .createReadStream()

      zipStream.pipe(res)

    } catch (error) {
      handleError(res, error)
    }

  }

}
