const { uploadFromJSON } = require("../../../../src/utilities");

const   { metadataJson } = require(appRoot + '/src/utilities/metadataUpload'),
        { uploadFromCSV } = require(appRoot + '/src/utilities'),
        { refresh } = require(appRoot + '/src/auth');
module.exports = {
    POST: async function(req, res) {
        let json, files, names, fields, values, base64;
        if('json' in req.body){
            json = req.body.json;
            ({ fields, values, names, base64 } = uploadFromJSON(json));
        }else{
            files = req.files;
            names = JSON.parse(req.body.names);
            ({ fields, values, base64 } = uploadFromCSV(files, names));
        }

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
        const json = {
            dataset: {
              label: 'Mis Oportunidades',
              name: 'mis_oportunidades',
              description: '',
              columnNames: [
                'Industry',
                'Amount',
                'Outcome'
              ]
            },
            rows: [
              { Industry: 'Manufacturing', Amount: 5000, Outcome: 'Yes' },
              { Industry: 'Healthcare', Amount: 1234, Outcome: 'Yes' },
              { Industry: 'Other', Amount: 5346, Outcome: 'No' }
            ]
        };
        const { fields, values, names, csv, base64 } = uploadFromJSON(json);
        /*
            Derised Outcome: 
            fields: [
                [ 'Name', 'Amount', 'Quantity' ],
                [ 'Name', 'Amount' ],
                [ 'Name', 'Amount' ],
                [ 'Name', 'Amount' ]
            ]
            values: [
                [ 'Test 101', '1100.70', '3' ],
                [ 'Test 01', '100.94' ],
                [ 'Test 31', '31.31' ],
                [ 'Test 91', '1100.70' ]
            ]
        */
        res.status(200).json({ success: true, fields, values, names, csv, base64 })
    }
}