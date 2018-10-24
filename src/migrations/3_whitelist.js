/* global artifacts web3 */

const BET = 10 ** 18
const PlayerWL = artifacts.require('../contracts/whitelists/PlayerWL.sol')

module.exports = async (deployer, network, accounts) => {
  const pWL = await PlayerWL.deployed()
  
  if (pWL) {
    await pWL.setAmountForPlayer(accounts[0], '1000000000000000000000', {from: accounts[0]})
    await pWL.setAmountForPlayer(accounts[1], '1000000000000000000000', {from: accounts[0]})
    await pWL.setAmountForPlayer(accounts[2], '1000000000000000000000', {from: accounts[0]})
  }
}
