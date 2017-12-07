# CO-Kafka

This is an example app of how setup and use kafka.

The docker-compose provide access to the following services:

* Zookeeper: port 2181
* Kafka: port 9092
* Schema Registry: port 8081
* Kafka Rest: port 8082
* Kafka Manager: port 9000

## Configuration

To access direct to kafka from the host machine is required to add the following hostname to `/etc/hosts`

```
127.0.0.1       broker
```

## Start Docker

```
docker-compose up -d
```

Access to docker with node:
```
docker exec -it cokafka_app_1 node
```

Access to the broker container
```
docker exec -it cokafka_broker_1 /bin/bash
```

## Producer Example
```
node src/simple-producer.js
```
## Consumer Example
```
node src/simple-consumer.js
```

## Kafka CLI Examples
```
kafka-console-consumer --topic test --bootstrap-server broker:9092 --group test-group
```

Alter partition number in topic 
```
kafka-topics  --alter --partitions 2 --topic test --zookeeper zookeeper:2181
```