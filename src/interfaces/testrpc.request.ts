import { IncomingMessage, ServerResponse } from 'http'
import { Socket } from 'net'

export interface TestrpcRequest {
  setState(value: any): TestrpcRequest

  handle(request: IncomingMessage, response: ServerResponse): void

  registerSocket(socket: Socket): void

  unregisterSockets(): void
}