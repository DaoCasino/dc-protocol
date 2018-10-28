
if [ $1 == 'local' ]; then
  truffle migrate --network development || exit 1
  truffle migrate --network development || exit 1
fi

if [ $1 == 'ropsten' ]; then
  truffle migrate --network ropsten || exit 1
fi

if [ $1 == 'rinkeby' ]; then
  truffle migrate --network rinkeby || exit 1
fi
