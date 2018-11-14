const path = require('path')
const ganache = require("ganache-core")


let state = {}

// more opts find in https://github.com/trufflesuite/ganache-cli/blob/develop/cli.js#L73
const options = {
  hostname: "0.0.0.0",
  port: 8545,
  verbose: true,
  // deterministic: false,
  // db_path: path.join(__dirname, './testrpc_db/'),
  defaultBalanceEther: 100000,
  blockTime: 2,
  gasPrice: 1,
  gasLimit: 7992181,
  mnemonic:
    "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"
}

// Set opts from env if exist
for (let k in options) {
  options[k] = process.env[k] || options[k]
}

console.log("Start ganache server with opts:")
console.table(options)


options.logger = {
  log (log) {
    let data = {}
    try {
      data = JSON.parse(log.split('   >').join(''))
    } catch (err) {}

    if (data.method) {
      this.event(data.method, data)
    } else {
      console.log(data)
    }
  },

  event (action, data) {
    console.log(action, data)
  }
}

const getContractsAddresses = function() {
  let addresses = {}
  try {
    addresses = require("./build/addresses.json")
  } catch (err) {
    addresses = { error: err, msg: "Cant find deployed contracts info" }
  }
  return addresses
}
const toHHMMSS = function(str) {
  var sec_num = parseInt(str, 10) // don't forget the second param
  var hours = Math.floor(sec_num / 3600)
  var minutes = Math.floor((sec_num - hours * 3600) / 60)
  var seconds = sec_num - hours * 3600 - minutes * 60

  if (hours < 10) {
    hours = "0" + hours
  }
  if (minutes < 10) {
    minutes = "0" + minutes
  }
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  var time = hours + ":" + minutes + ":" + seconds
  return time
}

const server = ganache.server(options)
server.listen(options.port, options.hostname, (err, result) => {
  if (err) {
    console.error(err)
    server.close()
    return
  }

  state = result || server.provider.manager.state

  state.privkeys = []
  Object.keys(state.accounts).forEach((address, i) => {
    state.privkeys.push({
      address: address,
      privkey: "0x" + state.accounts[address].secretKey.toString("hex"),
      balance:
        parseInt(state.accounts[address].account.balance.toString("hex"), 16) /
        10 ** 18
    })
  })
})

server.on("request", (req, res) => {
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Content-Type": "application/json"
  })

  if (req.url === "/status") {
    res.end(
      JSON.stringify({
        status: "ok",
        uptime: toHHMMSS(process.uptime()),
        uptime_raw: process.uptime()
      })
    )
  }

  if (req.url === "/mnemonic") {
    res.end(JSON.stringify({ phrase: state.mnemonic }))
  }

  if (req.url === "/accounts") {
    res.end(JSON.stringify(state.privkeys))
  }

  if (req.url.startsWith("/contracts")) {
    res.end(JSON.stringify(getContractsAddresses()))
  }

  const path = req.url.split("/")
  if ((path[1] === "contract" || path[1] === "contracts") && path[2]) {
    const contractName = path[2]

    let contract = { err: `${contractName} not found` }

    try {
      contract = require("./build/contracts/" +
        contractName.split("..").join("") +
        ".json")
    } catch (err) {
      console.warn("cant load contract file", err)
    }

    res.end(JSON.stringify(contract))
  }
})
