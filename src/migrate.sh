
if [ $1 == 'local' ]; then
  truffle migrate --network development || true
  truffle migrate --network development || true
fi

if [ $1 == 'ropsten' ]; then
  truffle migrate --network ropsten || true
fi

if [ $1 == 'rinkeby' ]; then
  truffle migrate --network rinkeby || true
fi
