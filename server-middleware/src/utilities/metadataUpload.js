module.exports = {
    metadataJson(params) {
        let { database, fields, values } = params;
        let formatedFields = [];
        let objectTmp = {};
        fields.forEach((field, i) => {
            objectTmp = {
                "description": "",
                "fullyQualifiedName": `${database}.${field}`,
                "label": field,
                "name": field,
                "isSystemField": false,
                "isUniqueId": false,
            };

            if(isNaN(values[field][0])){
                objectTmp['type'] = 'Text';
                objectTmp['isMultiValue'] = false;
            }else{
                objectTmp['type'] = 'Numeric';
                objectTmp['precision'] = 16;
                objectTmp['scale'] = 2;
                objectTmp['defaultValue'] = 0;
            }
            formatedFields.push(objectTmp);
        });
        return {
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
                    "fullyQualifiedName": database,
                    "label": database,
                    "name": database,
                    "fields": formatedFields
                }
            ]
        };
    }
}