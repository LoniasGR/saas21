#!/bin/bash

usage() { 
    echo "Usage: $0 [-b] [-u] [-d] [-l] [-h]"
    echo "Arguments:"
    echo "b: Build the containers"
    echo "u: Spin up the containers"
    echo "d: Stop the containers"
    echo "l: Get the container logs"
    echo "h: Display help message" 1>&2; exit 1; }

while getopts budlh flag
do
    case "${flag}" in
        b) build=1;;
        u) up=1;;
        d) down=1;;
        l) logs=1;;
        h) usage;;
        *) usage;;
    esac
done

if [ $down ]; then 
    docker-compose -f docker/docker-compose.yml -f microservices/docker/docker-compose.override.yml down
fi

if [ $build ]; then 
    docker-compose -f docker/docker-compose.yml -f microservices/docker/docker-compose.override.yml build
fi 

if [ $up ]; then 
    docker-compose -f docker/docker-compose.yml -f microservices/docker/docker-compose.override.yml up -d
fi

if [ $logs ]; then 
    docker-compose -f docker/docker-compose.yml -f microservices/docker/docker-compose.override.yml logs -f
fi

