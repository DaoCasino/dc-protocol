FROM mhart/alpine-node:10

MAINTAINER Alex Step <alex.step@dao.casino>

RUN apk add --no-cache make gcc g++ python git && npm i -g yarn
RUN yarn global add truffle@5.0.0-beta.2

# /protocol - foler to export with builded contracts, see entrypoint
RUN mkdir -p /protocol

# copy our protcol scripts
COPY ./src /deploy_protocol
WORKDIR /deploy_protocol
RUN mkdir -p testrpc_db

RUN yarn init -y && yarn add ganache-core@2.2.1 truffle@5.0.0-beta.2 truffle-hdwallet-provider@1.0.0-web3one.0
 # --production --pure-lockfile --non-interactive

RUN sh testrpc.sh nologs & sh migrate.sh local

EXPOSE 8545

ENTRYPOINT ["sh","/deploy_protocol/entrypoint.sh"] 