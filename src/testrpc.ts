import * as fs from 'fs'
import * as path from 'path'
import * as ganache from 'ganache-core'

import { default as argvParser } from 'args-parser'
import { sync as rmDirSync } from 'rmdir-recursive'
import { TestrpcRequest } from './testrpc.request'

import { spawn } from 'child_process'
import { Server } from 'http'
import { Socket } from 'net'

const DEFAULT_TOTAL_ACCOUNTS = 10
const DEFAULT_NETWORK = 'development'
const DEFAULT_BLOCK_TIME = 0
const DEFAULT_GASPRICE = 1
const DEFAULT_GASLIMIT = 7992181
const DEFAULT_MNEMONIC = 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat'
const DEFAULT_ETH_BALANCE = 10000

const BLOCKCHAIN_DB_PATH = 'testrpc_db'

class Testrpc {
  protected noDb: boolean
  protected resetDb: boolean
  protected network: string
  protected totalAccounts: number
  protected blockTime: number

  private networkInstance: Server

  initOptions(): Testrpc {
    this.noDb = Boolean(this.findOption('no-db', true))
    this.resetDb = Boolean(this.findOption('reset-db', false))
    this.network = this.findOption('network', DEFAULT_NETWORK)
    this.totalAccounts = this.findOption('total_accounts', DEFAULT_TOTAL_ACCOUNTS)
    this.blockTime = this.findOption('block_time', DEFAULT_BLOCK_TIME)
    return this
  }

  registerShutdown(): Testrpc {
    process.on('SIGTERM', () => this.shutdown())
    process.on('SIGINT', () => this.shutdown())

    return this
  }

  private shutdown() {
    console.log("[NETWORK] stopped")
    this.networkInstance.close()
    process.exit()
  }

  async run() {
    await this.initDatabaseStorage()
    await this.expandHttpHandlers(await this.startNetwork())
    await this.runMigrations()
  }

  private findOption(key: string, defaultValue: any) {
    let result = defaultValue

    let inputOptions = argvParser(process.argv)
    if (inputOptions[key] !== undefined) {
      result = inputOptions[key]
    }

    return result
  }


  private getNetworkConfig(): NetworkConfig {
    return {
      agent: false,
      hostname: '0.0.0.0',
      port: 8545,
      verbose: true,

      blockTime: this.blockTime,
      total_accounts: this.totalAccounts,

      defaultBalanceEther: DEFAULT_ETH_BALANCE,
      gasPrice: DEFAULT_GASPRICE,
      gasLimit: DEFAULT_GASLIMIT,
      mnemonic: DEFAULT_MNEMONIC
    }
  }

  private initDatabaseStorage(): Promise<void> {
    const dbPath = path.normalize(__dirname + '/' + BLOCKCHAIN_DB_PATH)

    return new Promise<void>(async (resolve, reject) => {
      if (this.noDb) {
        resolve()
      }

      if (fs.existsSync(dbPath)) {
        if (this.resetDb) {
          rmDirSync(dbPath)
        } else {
          resolve()
        }
      }

      fs.mkdir(dbPath, (err) => {
        err ? reject() : resolve()
      })
    })
  }

  private expandHttpHandlers(state): Promise<void> {
    return new Promise<void>(((resolve) => {
      const requestHandler = new TestrpcRequest()
      requestHandler.setState(state)

      this.networkInstance.on('request', (request, response) => requestHandler.handle(request, response))
      this.networkInstance.on('connection', (socket: Socket) => requestHandler.registerSocket(socket))
      process.on('beforeExit', () => requestHandler.unregisterSockets())

      resolve()
    }))
  }

  private startNetwork(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const config = this.getNetworkConfig()

      console.log('Start network port: %s:%s', config.hostname, config.port)

      this.networkInstance = ganache.server(config)

      this.networkInstance.listen(config.port, config.hostname, (error, state) => {
        if (error) {
          console.error("Server network listener error: ", error)
          this.networkInstance.close()
          reject()
        }

        console.log('Network started')

        resolve(state)
      })
    })
  }

  private runMigrations(): Promise<void> {
    return new Promise<void>(((resolve) => {
      console.log('Start truffle migrations into %s network', this.network)

      const migrateProcess = spawn(
        'truffle',
        ['migrate', '--network', this.network],
        { detached: true }
      )
      migrateProcess.stdout.on('data', (data: string) => {
        console.log(String(data))
      })

      migrateProcess.on('exit', (code) => {
        console.log("Truffle completed", code)
      })

      resolve()
    }))
  }
}

interface NetworkConfig {
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

(new Testrpc())
  .registerShutdown()
  .initOptions()
  .run()
  .catch(console.error)