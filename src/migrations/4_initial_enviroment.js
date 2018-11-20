const BET = 10 ** 18
const Platform = artifacts.require('../contracts/token/Platform.sol')
const Game     = artifacts.require('../contracts/game/myDappGame.sol')

module.exports = async (deployer, network, accounts) => {
  if (network === 'ropsten' || network === 'ropsten-fork' || network === 'rinkeby') return

  const platform = await Platform.deployed()
  await platform.setAmountForPlayer(accounts[0], '1000000000000000000000', {from: accounts[0]})
  await platform.setAmountForPlayer(accounts[1], '1000000000000000000000', {from: accounts[0]})
  await platform.setAmountForPlayer(accounts[2], '1000000000000000000000', {from: accounts[0]})
  await platform.addGame(Game.address, {from: accounts[0]})
}
