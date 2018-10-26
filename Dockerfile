FROM mhart/alpine-node:10

MAINTAINER Alex Step <alex.step@dao.casino>

RUN apk add --no-cache make gcc g++ python git && npm i -g yarn
RUN yarn global add truffle@beta

# /protocol - foler to export with builded contracts, see entrypoint
RUN mkdir -p /protocol

# copy our protcol scripts
COPY ./src /deploy_protocol
WORKDIR /deploy_protocol

RUN yarn init -y && yarn add ganache-core truffle@beta truffle-hdwallet-provider
 # --production --pure-lockfile --non-interactive

# run ganache-cli and start truffle migrations
RUN sh testrpc.sh & sh migrate.sh

EXPOSE 8545

ENTRYPOINT ["sh","/deploy_protocol/entrypoint.sh"] 