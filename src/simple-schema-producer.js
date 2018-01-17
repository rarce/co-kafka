const kafka = require('node-rdkafka');
const config = require('config');
const avro = require('avsc');
const schemas = require('./schemas');

const producerVersion = 'v2';
const producer = new kafka.Producer(config.get('kafka.producer'));

const getType = async (entity, versionName) => {
  let entitySchemas = await schemas.getSchema(entity);
  schema = entitySchemas.find((elem) => {return elem.versionName === versionName});
  return avro.Type.forSchema(schema.schema);
}

const data = {
  name: 'Roberto',
  address: 'Chile',
  email: 'test@example.com'
};

let userType = getType('user', producerVersion);

var sendMessage = async (producer, type) => {
  let encoder = await type;
  binary_data = encoder.toBuffer(data);
  producer.produce(
    // Topic
    'test',
    // Partition
    null,
    // Message
    binary_data,
    // Key
    null,
    // Timestamp
    Date.now()
  );
}

producer.on('ready', () => {
  setInterval(function () {
    sendMessage(producer, userType)
  }, 1000);
});

producer.connect()
