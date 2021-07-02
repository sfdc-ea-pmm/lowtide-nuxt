const   { metadataJson } = require(appRoot + '/src/utilities/metadataUpload'),
        { uploadFromCSV } = require(appRoot + '/src/utilities'),
        { refresh } = require(appRoot + '/src/auth');
module.exports = {
    POST: async function(req, res) {
        /*
        const files = req.files;
        const names = JSON.parse(req.body.names);
        res.status(200).json({ success: true, files: files, names: names });
        */

        const files = req.files;
        const names = JSON.parse(req.body.names);

        const { fields, values, base64 } = uploadFromCSV(files, names);
        
        let jsonArray = metadataJson({
            names: names,
            fields: fields,
            values: values
        });
        
        sf = refresh(req.session);

        let responseParent;
        let metadataJson64;
        let responseChild;
        let data = [];

        for (let i = 0; i < base64.length; i++) {

            metadataJson64 = Buffer.from(JSON.stringify(jsonArray[i])).toString("base64");
            responseParent = await sf.sobject("InsightsExternalData").create({
                Format : 'Csv',
                EdgemartAlias: names[i],
                MetadataJson: metadataJson64,
                Operation: 'Overwrite',
                Action: 'None'
            });

            responseChild = await sf.sobject("InsightsExternalDataPart").create({
                DataFile : base64[i],
                InsightsExternalDataId: responseParent.id,
                PartNumber: 1 //Multiple: i+1
            });

            await sf.sobject("InsightsExternalData").update({ 
                Id : responseParent.id,
                Action : 'Process'
            });

            data.push(responseParent);
        }

        res.status(200).json({ success: true, data: data})
        
    },
    GET: async function(req, res) {
        res.status(200).json({ success: true })
    }
}