var Migrations = artifacts.require('./devtools/Migrations.sol')

module.exports = async function (deployer, network) {
  if (network === 'ropsten'|| network === 'ropsten-fork'||network === 'rinkeby') return
  deployer.deploy(Migrations)
}
