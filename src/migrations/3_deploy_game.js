const ERC20 = artifacts.require("../contracts/token/ERC20.sol")
const Platform = artifacts.require("../contracts/platform/Platform.sol")
const Utils = artifacts.require("../contracts/library/Utils.sol")
const Signidice = artifacts.require("../contracts/Signidice/Signidice.sol")
const GameEngine = artifacts.require("../contracts/game/GameEngine.sol")
const MyDappGame = artifacts.require("../contracts/game/MyDappGame.sol")

module.exports = async deployer => {
  await deployer.link(Utils, MyDappGame)
  await deployer.deploy(GameEngine, Signidice.address)
  await deployer.deploy(
    MyDappGame,
    GameEngine.address,
    ERC20.address,
    Platform.address,
    Signidice.address
  )
  // const GameContract = await Game.deployed()
  // const name = await GameContract.getName.call()
  console.log(`
        >>> Deploy complete <<<
  `)
}
