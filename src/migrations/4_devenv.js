const fs   = require('fs')

const ERC20    = artifacts.require('../contracts/core/ERC20.sol')
const ref      = artifacts.require('../contracts/whitelists/Referrer.sol')
const RSA      = artifacts.require('../contracts/core/RSA.sol')
const GameWL   = artifacts.require('../contracts/whitelists/GameWL.sol')
const PlayerWL = artifacts.require('../contracts/whitelists/PlayerWL.sol')
const Game     = artifacts.require('../contracts/whitelists/myDAppGame.sol')


module.exports = async (deployer, network, accounts) => {
  if (network === 'ropsten' || network === 'ropsten-fork' || network === 'rinkeby') return

  const config = {
    myDAppGame : Game.address    ,
    Game       : Game.address    ,
    ERC20      : ERC20.address    ,
    Referrer   : ref.address      ,
    GameWL     : GameWL.address   ,
    PlayerWL   : PlayerWL.address ,
    RSA        : RSA.address
  }
  
  const instance = await ERC20.deployed()
  await instance.faucet({from: accounts[0]})

  for (let i = 0; i < accounts.length; i++) {
    if (i === 0) continue

    const tx  = await instance.transfer(
      accounts[i],
      (i === accounts.length - 1) ? '5000000000000000000000' : '100000000000000000000',
      {from: accounts[0]}
    )
    const bet = await instance.balanceOf.call(accounts[i])
    console.log(`
      -----------------------------
      tx:      ${tx.receipt.transactionHash}
      address: ${accounts[i]}
      balance: ${bet}
      -----------------------------
    `)
  }

  const filepath = './build/addresses.json'
  console.log('')
  console.log('')
  console.log('Write deployed contracts addressese to ' + filepath)
  console.log('')
  console.log('')


  return fs.writeFileSync(filepath, JSON.stringify(config))
}

