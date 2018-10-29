#!/usr/bin/env bash
# clear

if [ $1 == 'local' ]; then
  npm run migrate:local || clear
  npm run migrate:local || exit 1
fi

if [ $1 == 'ropsten' ]; then
   npm run migrate:ropsten || exit 1
fi

if [ $1 == 'rinkeby' ]; then
   npm run migrate:rinkeby || exit 1
fi
