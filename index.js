const contractAddresses = (process.env.DC_NETWORK === 'local')
  ? require("./v_0.1/build/addresses.json")
  : false

module.exports = { contractAddresses }
