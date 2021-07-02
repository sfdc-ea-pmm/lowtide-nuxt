module.exports = {
    metadataJson(params) {
        let { names, fields, values } = params;
        let formatedFields = [];
        let objectTmp = {};
        const results = [];
        fields.forEach((set, i) => {
            let format;
            formatedFields = []
            set.forEach((field, ia) => {
                objectTmp = {
                    "description": "",
                    "fullyQualifiedName": `${names[i]}.${field}`,
                    "label": field,
                    "name": field,
                    "isSystemField": false,
                    "isUniqueId": false,
                };

                if(isNaN(values[i][ia])){
                    objectTmp['type'] = 'Text';
                    objectTmp['isMultiValue'] = false;
                }else{
                    objectTmp['type'] = 'Numeric';
                    objectTmp['precision'] = 16;
                    objectTmp['scale'] = 2;
                    objectTmp['defaultValue'] = 0;
                }
                formatedFields.push(objectTmp)
            });
            format = {
                "fileFormat": {
                    "charsetName": "UTF-8",
                    "fieldsEnclosedBy": "\"",
                    "fieldsDelimitedBy": ",",
                    "numberOfLinesToIgnore": 1
                },
                "objects": [
                    {
                        "connector": "AcmeCSVConnector",
                        "description": "",
                        "fullyQualifiedName": names[i],
                        "label": names[i],
                        "name": names[i],
                        "fields": formatedFields
                    }
                ]
            };
            results.push(format);
        });
        return results;
    }
}