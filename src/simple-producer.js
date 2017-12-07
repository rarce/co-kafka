const kafka = require('node-rdkafka');
const config = require('config');

var producer = new kafka.Producer(config.get('kafka.producer'));
var sendMessage = (producer) => {
  producer.produce(
    // Topic
    'test',
    // Partition
    null,
    // Message
    new Buffer('Awesome message ' + (new Date()).toISOString()),
    // Key
    null,
    // Timestamp
    Date.now()
  );
}

producer.on('ready', () => {
  setInterval(function() {
    sendMessage(producer)
  }, 1000);
});

producer.connect()
