#!/bin/bash -e
echo $1
mkdir -p testrpc_db 

npm start
# ganache-cli -a 10 --host=0.0.0.0 --port=8545 \
# --db=./testrpc_db \
# --blockTime=2 \
# --defaultBalanceEther=100000 \
# --gasPrice=1 \
# --gasLimit=7992181 \
# --mnemonic="candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" \
# --deterministic=false