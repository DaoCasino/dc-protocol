#!/bin/bash -e

docker build -t dc_protocol . 
docker run -it -v "$PWD"/check_linked_contracts:/protocol dc_protocol