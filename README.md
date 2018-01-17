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
127.0.0.1       schema_registry
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

## Schema Registry Example

The producer, send data using the version `v2` of the schema user (schema/user/user.v2.avsc)

```
node src/simple-schema-consumer.js
```

The consumer consume both version `v1` and `v2` of the schema
```
node src/simple-schema-consumer.js
```

The data format don't follow the [format](https://docs.confluent.io/current/schema-registry/docs/serializer-formatter.html#wire-format) of the Avro serializers that are implemented on Java and Python clients, there exist the package [kafka-avro](https://github.com/waldophotos/kafka-avro) that currently implements this format but does not stay updated.
