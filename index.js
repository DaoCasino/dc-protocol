const contractAddresses = (process.env.DC_NETWORK === 'local')
  ? require("./src/build/addresses.json")
  : false

module.exports = { contractAddresses }
