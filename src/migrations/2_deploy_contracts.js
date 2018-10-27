const ERC20    = artifacts.require('../contracts/core/ERC20.sol')
const ref      = artifacts.require('../contracts/whitelists/Referrer.sol')
const RSA      = artifacts.require('../contracts/core/RSA.sol')
const GameWL   = artifacts.require('../contracts/whitelists/GameWL.sol')
const PlayerWL = artifacts.require('../contracts/whitelists/PlayerWL.sol')
const Miner    = artifacts.require('.,/contracts/BlockMiner.sol')
const Game     = artifacts.require('../contracts/myDAppGame.sol')

module.exports = async (deployer, network) => {
  switch (network) {
    case 'ropsten':
      ERC20.address = '0x5D1E47F703729fc87FdB9bA5C20fE4c1b7c7bf57'
      ref.address = '0x674ff87adfe928b8b0ffbbddf7faeb5ae7a1f9d6'
      GameWL.address = '0x19dbd1984278e70ab11dbdfb079d810f986db3fe'
      PlayerWL.address = '0xbc993df3cf69018a17234326e0e02fc11ed35264'
      RSA.address = '0x214c3e2505d47e01f286b97ec6779b149cab65f7'
      break
    case 'rinkeby':
      ERC20.address = '0x995cf44c0bdff07a9b6e171802cdc83d3c4add82'
      ref.address = '0xf3e12c4dbba553b349d401de619f3d07d21e2cba'
      GameWL.address = '0x53dc9f0f866036a7f414eb38c54e9f591543d3ab'
      PlayerWL.address = '0xa11507b34df7edcbd23f8891799752a2818b2f1b'
      RSA.address = '0xbc0516a911fd87741b5202f86f9f85600179f6c8'
      break
    case 'development':
      await deployer.deploy(ERC20)
      await deployer.deploy(ref)
      await deployer.deploy(RSA)
      await deployer.deploy(GameWL)
      await deployer.deploy(PlayerWL, 100000000000)
      await deployer.deploy(Miner)
      break
    default:
      break
  }

  await deployer.deploy(
    Game,
    ERC20.address,
    ref.address,
    GameWL.address,
    PlayerWL.address,
    RSA.address,
  )

  console.log('>>> Deploy DAO Casino Protocol contracts - complete <<<')
}
