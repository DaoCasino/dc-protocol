var Migrations = artifacts.require('./devtools/Migrations.sol')

module.exports = async function (deployer) {
  deployer.deploy(Migrations)
}
