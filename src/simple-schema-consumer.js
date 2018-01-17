const kafka = require('node-rdkafka');
const config = require('config');
const avro = require('avsc');
const schemas = require('./schemas');

const getType = async (entity, versionName) => {
  let entitySchemas = await schemas.getSchema(entity);
  schema = entitySchemas.find((elem) => {return elem.versionName === versionName});
  return avro.Type.forSchema(schema.schema);
}

var consumer = new kafka.KafkaConsumer(config.get('kafka.consumer'), config.get('kafka.consumer-topic'));
let userType = getType('user', 'v2');
let oldUserType = getType('user', 'v1');

const consumeSchemaData = async (data, type) => {
    let encoder = await type;
    console.log(encoder.fromBuffer(data.value));
}

const consumeOldSchemaData = async (data, writeType, readType) => {
    let writeEncoder = await writeType;
    let readEncoder = await readType;
    let resolver = readEncoder.createResolver(writeEncoder);

    console.log(readEncoder.fromBuffer(data.value, resolver));
}

consumer.connect();

consumer
  .on('ready', function() {
    consumer.subscribe(['test']);
    consumer.consume();
  })
  .on('data', function(data) {
    // v2 consumer      
    consumeSchemaData(data, userType);
    // v1 consumer
    consumeOldSchemaData(data, userType, oldUserType);
  });