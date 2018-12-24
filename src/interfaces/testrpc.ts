export interface Testrpc {
  initOptions(): Testrpc

  registerShutdown(): Testrpc

  run(): Promise<void>
}