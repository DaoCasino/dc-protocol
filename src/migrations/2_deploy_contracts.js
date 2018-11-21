const ERC20     = artifacts.require('../contracts/token/ERC20.sol')
const Platform  = artifacts.require('../contracts/platform/Platform.sol')
const Utils     = artifacts.require('../contracts/library/Utils.sol')
const Signidice = artifacts.require('../contracts/Signidice/Signidice.sol')

module.exports = async (deployer, network) => {
  switch(network) {
    case 'ropsten':
    case 'ropsten-fork':
    ERC20.address     = '0x5D1E47F703729fc87FdB9bA5C20fE4c1b7c7bf57'
    Platform.address  = '0xC60B670764306d47a6406aA54624a37162a71F6f'
    Utils.address     = '0xEB1CE2Cf5f5963f2CC55250E912020379BB4663f'
    Signidice.address = '0x976410107BacA081a5B0C8CA47eb6F72d80ba8bc'
    break;
    case 'rinkeby':
    ERC20.address     = '0x'
    Platform.address  = '0x'
    Utils.address     = '0x'
    Signidice.address = '0x'
    break;
    default:
    await deployer.deploy(ERC20)
    await deployer.deploy(Platform)
    await deployer.deploy(Utils)
    await deployer.deploy(Signidice)
  }
  console.log('>>> Deploy DAO Casino Protocol contracts - complete <<<')
}
