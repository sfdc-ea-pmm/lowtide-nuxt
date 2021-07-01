const   { metadataJson } = require(appRoot + '/src/utilities/metadataUpload'),
        { refresh } = require(appRoot + '/src/auth');
module.exports = {
    POST: async function(req, res) {
        const files = req.files;
        const names = JSON.parse(req.body.names);
        res.status(200).json({ success: true, files: files, names: names });
        /*
        const files = req.files;
        const name = req.body.name;
        const filesEntries = Object.entries(files);
        const base64 = [];

        const myString = [];
        filesEntries.forEach(value => {
            base64.push(value[1].data.toString("base64"));
            myString.push(value[1].data.toString("utf8"));
        });

        const rows = [];
        myString.forEach(value => {
            rows.push(value.split('\r\n'));
        });
        
        const fields = [];
        const fieldsTmp = [];
        const values = {};
        const valuesTmp = [];
        rows.forEach(value => {
            fieldsTmp.push(value[0].split(','));
            valuesTmp.push(value[1].split(','));
        });
        fields.push(...fieldsTmp[0]);
        
        fields.forEach((field, ib) => {
            values[field] = [];
            valuesTmp.forEach((value) => {
                values[field].push(value[ib]);
            });
        });
        
        let json = metadataJson({
            database: 'Account',
            fields: fields,
            values: values
        });
        sf = refresh(req.session);

        var metadataJson64 = Buffer.from(JSON.stringify(json)).toString("base64");
        const responseParent = await sf.sobject("InsightsExternalData").create({
            Format : 'Csv',
            EdgemartAlias: name,
            MetadataJson: metadataJson64,
            Operation: 'Overwrite',
            Action: 'None'
        });
        let responseChild;
        for (let i = 0; i < base64.length; i++) {
            responseChild = await sf.sobject("InsightsExternalDataPart").create({
                DataFile : base64[i],
                InsightsExternalDataId: responseParent.id,
                PartNumber: i+1
            });
        }
        await sf.sobject("InsightsExternalData").update({ 
            Id : responseParent.id,
            Action : 'Process'
        });

        res.status(200).json({ success: true, responseParent: responseParent })
        */
    },
    GET: async function(req, res) {
        res.status(200).json({ success: true })
    }
}