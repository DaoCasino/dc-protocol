#!/bin/bash

set -ex

PARENT_DIR=$(basename "${PWD%/*}")
CURRENT_DIR="${PWD##*/}"

ACCOUNT="daocasino"
IMAGE_NAME="protocol"
TAG="${1}" # first arg is tag

docker build -t ${ACCOUNT}/${IMAGE_NAME}:${TAG} -t ${ACCOUNT}/${IMAGE_NAME}:latest .
docker push ${ACCOUNT}/${IMAGE_NAME}
