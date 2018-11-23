const ERC20 = artifacts.require('../contracts/token/ERC20.sol')

module.exports = async (deployer, network, accounts) => {
  if (network === 'ropsten'|| network === 'ropsten-fork'||network === 'rinkeby') return
  
  const contract = await ERC20.deployed()
  for (var i = 0; i < accounts.length; i++) {
    if (process.env.NODE_ENV==='test' && i > 1) {
      return
    }

    await contract.faucet({from: accounts[i]})
    var bet = await contract.balanceOf.call(accounts[i])
    console.log(`
        -----------------------------
        address: ${accounts[i]}
        balance: ${bet/10**18} BET
        -----------------------------
      `)
  }
}
