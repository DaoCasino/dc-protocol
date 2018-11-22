/* global artifacts web3 */
const Platform   = artifacts.require('../contracts/platform/Platform.sol')
const MyDappGame = artifacts.require('../contracts/game/MyDappGame.sol')

module.exports = async (deployer, network, accounts) => {
  const platform = await Platform.deployed()
  await platform.addGame(MyDappGame.address, {from: accounts[0]})
}
