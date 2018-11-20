const ERC20     = artifacts.require('../contracts/token/ERC20.sol')
const Platform  = artifacts.require('../contracts/platform/Platform.sol')
const Utils     = artifacts.require('../contracts/lib/Utils.sol')
const Signidice = artifacts.require('../contracts/Signidice/Signidice.sol')

const Engine   = artifacts.require('../contracts/gameEngine/GameEngine.sol')
const Game     = artifacts.require('../contracts/game/myDappGame.sol')

module.exports = async (deployer) => {
    await deployer.link(Utils, Game)
    await deployer.deploy(Engine, Signidice.address)
    await deployer.deploy(Game, Engine.address, ERC20.address, Platform.address, Signidice.address)
    console.log('>>> Deploy Game contracts - complete <<<')
}
