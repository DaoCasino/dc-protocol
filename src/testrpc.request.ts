import { IncomingMessage, ServerResponse } from 'http'
import { Socket } from 'net'
import moment from 'moment'

export class TestrpcRequest {
  private socketStorage: Map<number, Socket> = new Map<number, Socket>()
  private state: any

  setState(value: any) {
    this.state = value

    return this
  }

  public handle(request: IncomingMessage, response: ServerResponse) {

    let processedUrl = this.processUrl(request.url)

    if (!processedUrl) {
      return
    }

    response.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Content-Type': 'application/json'
    })

    response.end(
      JSON.stringify(
        processedUrl
      )
    )
  }

  public registerSocket(socket: Socket) {
    console.log("REGISTER NEW SOCKET", socket.remotePort)
    this.socketStorage.set(socket.remotePort, socket)
    socket.on('close', () => {
      this.socketStorage.delete(socket.remotePort)
    })
  }

  public unregisterSockets() {
    this.socketStorage.forEach((socket: Socket) => {
      console.log("UNREGISTER SOCKET", socket.remotePort)
      socket.destroy()
    })
  }

  private processUrl(url: string) {
    switch (url.split('/')[1]) {
      case Routes.STATUS:
        return this.getStatus()
      case Routes.ACCOUNTS:
        return this.getAccounts()
      case Routes.CONTRACTS:
        return this.getContracts()
      case Routes.CONTRACT:
        return this.getContract(url.split('/')[2])
      case Routes.MNEMONIC:
        return this.getMnemonic()
      default:
        return ''
    }
  }

  private getStatus() {
    return {
      status: 'ok',
      uptime: moment().subtract(process.uptime(), 'seconds').fromNow(true),
      uptime_raw: process.uptime()
    }
  }

  private getMnemonic() {
    return { phrase: this.state.mnemonic }
  }

  private getAccounts() {
    let result = []
    Object.keys(this.state.accounts).forEach((address, i) => {
      result.push({
        address,
        privkey: this.state.accounts[address].secretKey.toString('hex'),
        balance: parseInt(this.state.accounts[address].account.balance.toString('hex'), 16) / 10 ** 18
      })
    })

    return result
  }

  private getContracts() {
    let contracts = {}
    try {
      contracts = require('./build/addresses.json')
    } catch (err) {
      contracts = { error: err, msg: 'Cant find deployed contracts info' }
    }
    return contracts
  }

  private getContract(contractName: string) {
    let contracts = this.getContracts()

    if (!contractName || contracts[contractName] === undefined) {
      return { error: 'err', msg: 'Contract not found' }
    }

    return contracts[contractName]
  }
}

export enum Routes {
  STATUS = 'status',
  MNEMONIC = 'mnemonic',
  ACCOUNTS = 'accounts',
  CONTRACT = 'contract',
  CONTRACTS = 'contracts',
}