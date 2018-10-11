#!/bin/bash -e

docker build -t dc_protocol . 
docker run -it -p 8545:8545 -v "$PWD"/v_0.1/build:/protocol dc_protocol