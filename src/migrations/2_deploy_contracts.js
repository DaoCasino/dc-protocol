const ERC20     = artifacts.require('../contracts/token/ERC20.sol')
const Platform  = artifacts.require('../contracts/core/Platform.sol')
const Utils     = artifacts.require('../contracts/lib/Utils.sol')
const Signidice = artifacts.require('../contracts/Signidice/Signidice.sol')



module.exports = async (deployer, network) => {
  switch (network) {
    case 'ropsten':
      ERC20.address     = '0x5D1E47F703729fc87FdB9bA5C20fE4c1b7c7bf57'
      Platform.address  = '0x42'
      Utils.address     = '0x42'
      Signidice.address = '0x214c3e2505d47e01f286b97ec6779b149cab65f7'
      break
    case 'rinkeby':
      ERC20.address     = '0x995cf44c0bdff07a9b6e171802cdc83d3c4add82'
      Platform.address  = '0x42'
      Utils.address     = '0x42'
      Signidice.address = '0xbc0516a911fd87741b5202f86f9f85600179f6c8'
      break
    case 'development':
      await deployer.deploy(ERC20)
      await deployer.deploy(Platform)
      await deployer.deploy(Utils)
      await deployer.deploy(Signidice)
      break
    default:
      break
  }
  console.log('>>> Deploy DAO Casino Protocol contracts - complete <<<')
}
