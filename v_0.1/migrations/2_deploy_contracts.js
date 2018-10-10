const ERC20    = artifacts.require('../contracts/core/ERC20.sol')
const ref      = artifacts.require('../contracts/whitelists/Referrer.sol')
const RSA      = artifacts.require('../contracts/core/RSA.sol')
const GameWL   = artifacts.require('../contracts/whitelists/GameWL.sol')
const PlayerWL = artifacts.require('../contracts/whitelists/PlayerWL.sol')
const Miner    = artifacts.require('.,/contracts/BlockMiner.sol')

module.exports = async (deployer, network) => {
  await deployer.deploy(ERC20)
  await deployer.deploy(ref)
  await deployer.deploy(RSA)
  await deployer.deploy(GameWL)
  await deployer.deploy(PlayerWL, 100000000000)
  await deployer.deploy(Miner)
  
  console.log('>>> Deploy DAO Casino Protocol contracts - complete <<<')
}
