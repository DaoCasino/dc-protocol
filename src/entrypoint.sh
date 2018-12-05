#!/bin/bash -e

mkdir -p /protocol
cp -r ./build/* /protocol/

sh `dirname "$0"`/testrpc.sh