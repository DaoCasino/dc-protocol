var Migrations = artifacts.require('./Migrations.sol')

module.exports = function (deployer, network) {
  if (network === 'ropsten' || network === 'ropsten-fork' || network === 'rinkeby') return
  deployer.deploy(Migrations)
}
