const fs = require("fs")

const ERC20     = artifacts.require('../contracts/token/ERC20.sol')
const Game      = artifacts.require('../contracts/game/MyDappGame.sol')
const Engine    = artifacts.require('../contracts/game/GameEngine.sol')
const Utils     = artifacts.require('../contracts/library/Utils.sol')
const Platform  = artifacts.require('../contracts/platform/Platform.sol')
const Signidice = artifacts.require('../contracts/signidice/Signidice.sol')

module.exports = async (deployer, network, accounts) => {
  
  const config = {
    Game      : Game.address      ,
    ERC20     : ERC20.address     ,
    Utils     : Utils.address     ,
    Platform  : Platform.address  ,
    GamEngine : Engine.address    ,
    Signidice : Signidice.address
  }

  const filepath = "./build/addresses.json"
  console.log("deployed addresses wrote to " + filepath)
  return fs.writeFileSync(filepath, JSON.stringify(config))
}

