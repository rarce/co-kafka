const kafka = require('node-rdkafka');
const config = require('config');

var consumer = new kafka.KafkaConsumer(config.get('kafka.consumer'), config.get('kafka.consumer-topic'));

consumer.connect();

consumer
  .on('ready', function() {
    consumer.subscribe(['test']);
    consumer.consume();
  })
  .on('data', function(data) {
    console.log(data.value.toString());
  });