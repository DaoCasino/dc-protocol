#!/usr/bin/env bash -e

rm -rf ./build

clear
case "$1" in
"local")
    truffle migrate --network development || clear
    truffle migrate --network development || exit 1
    ;;
"ropsten")
    truffle migrate --network ropsten || exit 1
    ;;
"rinkeby")
    truffle migrate --network rinkeby || exit 1
    ;;
*)
    echo "Undefined network"
    exit 1
    ;;
esac
