export interface NetworkConfig {
  agent: boolean
  hostname: string
  port: number
  verbose: boolean
  deterministic?: boolean,
  defaultBalanceEther: number,
  blockTime: number,
  total_accounts: number,
  gasPrice: number,
  gasLimit: number,
  mnemonic: string
}