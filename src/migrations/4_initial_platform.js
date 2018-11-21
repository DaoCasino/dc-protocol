/* global artifacts web3 */
const Platform    = artifacts.require('../contracts/platform/Platform.sol')
const GameChannel = artifacts.require('../contracts/gameChannel/GameEngine.sol')

module.exports = async (deployer, network, accounts) => {
  const platform = await Platform.deployed()
  //await platform.setAmountForPlayer(accounts[0], '1000000000000000000000', {from: accounts[0]})
  await platform.addGame(GameChannel.address, {from: accounts[0]})
}
