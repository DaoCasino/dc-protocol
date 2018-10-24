FROM mhart/alpine-node:10

MAINTAINER Alex Step <alex.step@dao.casino>

# /protocol - foler to export with builded contracts, see entrypoint
RUN mkdir -p /protocol

# install requriments software
RUN npm i -g npm@6 && \
	npm i -g truffle@beta

# copy our protcol scripts
COPY ./src /deploy_protocol
WORKDIR /deploy_protocol
RUN npm i

# run ganache-cli and start truffle migrations
RUN sh testrpc.sh & sh migrate.sh

EXPOSE 8545

ENTRYPOINT ["sh","/deploy_protocol/entrypoint.sh"] 