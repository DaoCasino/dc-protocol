const fs = require("fs")
const ERC20 = artifacts.require("../contracts/token/ERC20.sol")
const Game = artifacts.require("../contracts/game/myDappGame.sol")
const Platform = artifacts.require("../contracts/platform/Platform.sol")
const Signidice = artifacts.require("../contracts/Signidice/Signidice.sol")

module.exports = async (deployer, network, accounts) => {
  const config = {
    myDAppGame: Game.address,
    Game: Game.address,
    ERC20: ERC20.address,
    Platform: Platform.address,
    Signidice: Signidice.address
  }
  
  if (network !== 'ropsten' || network !== 'ropsten-fork') {
    const instance = await ERC20.deployed()
    await instance.faucet({ from: accounts[0] })

    for (let i = 0; i < accounts.length; i++) {
      if (i === 0) continue

      const tx = await instance.transfer(
        accounts[i],
        i === accounts.length - 1
          ? "5000000000000000000000"
          : "100000000000000000000",
        { from: accounts[0] }
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
  }

  const filepath = "./build/addresses.json"
  console.log("")
  console.log("")
  console.log("Write deployed contracts addressese to " + filepath)
  console.log("")
  console.log("")

  return fs.writeFileSync(filepath, JSON.stringify(config))
}
