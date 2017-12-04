# CO-Kafka

This is an example app of how setup and use kafka.

The docker-compose provide access to the following services:

* Zookeeper
* Kafka
* Schema Registry
* Kafka Rest
* Kafka Manager

## Configuration

To access direct to kafka from the host machine is required to add the following hostname to `/etc/hosts`

```
127.0.0.1       broker
```

## Start Docker

```
docker-compose up -d
```

## Producer Example

## Consumer Example