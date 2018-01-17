const fs = require('fs');
const config = require('config');
const request = require('request-promise');


const readSchemas = (entity) => {
  const path = `schema/${entity}/`;
  const files = fs.readdirSync(path);
  let schemas =  files.map(file => {
    var versionName = file.split('.')[1];
    return {
      versionName: versionName,
      schema: JSON.parse(fs.readFileSync(path + file))
    }
  });
  return(schemas);
}

const registerSchema = (entity, schemaObject) => {
  const headers = {
    'Content-Type': 'application/vnd.schemaregistry.v1+json',
    'Accept': 'application/vnd.schemaregistry.v1+json, application/vnd.schemaregistry+json, application/json'
  };
  const options = {
    uri: config.get('kafka.schema_registry.url') + `/subjects/${entity}/versions`,
    method: 'POST',
    headers: headers,
    json: {
      "schema": JSON.stringify(schemaObject.schema)
    }
  };
  return(request(options).then(r => ({
    versionName: schemaObject.versionName, 
    id: r.id,
    schema: schemaObject.schema
  })));
}

const getSchema = (entity) => {
  // register
  const promises = readSchemas(entity)
    .map(schemaObject => registerSchema(entity, schemaObject))
  
   return Promise.all(promises);
}

module.exports = {getSchema};
