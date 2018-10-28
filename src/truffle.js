const path             = require('path')
const HDWalletProvider = require('truffle-hdwallet-provider')
const defaultMnemonic = 'glass method front super auto hole know grace select prevent custom fancy'

module.exports = {
  networks: {
    development: {
      gas        : 6700000,
      gasPrice   : 32,
      host       : '0.0.0.0',
      port       : 8545,
      network_id : '*'
    },

    ropsten: {
      gas           : 5500000,
      gasPrice      : 10000000000,
      provider      : new HDWalletProvider(process.env.MNEMONIC || defaultMnemonic, 'https://ropsten.infura.io'),
      network_id    : 3,
      skipDryRun    : true,
      timeoutBlocks : 200
    },

    rinkeby: {
      gas           : 5500000,
      gasPrice      : 10000000000,
      provider      : new HDWalletProvider(process.env.MNEMONIC || defaultMnemonic, 'https://rinkeby.infura.io'),
      network_id    : 1,
      skipDryRun    : true,
      timeoutBlocks : 200
    }
  },

  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },

  contracts_directory: process.env.CONTRACTS_PATH || path.join(__dirname, './contracts'),
}
