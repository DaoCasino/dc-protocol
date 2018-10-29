const path = require('path')
const program = require('commander')
const { spawn } = require('child_process')

function testrpcStart(options) {
  return new Promise((resolve, reject) => {
    if (options.host) {
      process.env.hostname = options.host
    }

    if (options.port) {
      process.env.port = options.port
    }

    spawn('sh ./testrpc.sh', { cwd: path.join(__dirname, './src'), shell: true, stdio: 'inherit' })
      .on('error', error => reject(error))
      .on('exit', code => {
        (code !== 0)
          ? reject(new Error(`child_process exit with code ${code}`))
          : resolve(code)
      })
  })
}

function migrateContracts (blockchainNetwork) {

}

program
  .version(require('./package.json').version)
  .usage('<command> [options]')
  .description('Deamon for dc-protocol')

program
  .command('start')
  .usage('[options]')
  .description('start dc-protocol testrpc with params')
  .option('-h, --host', 'set hostname')
  .option('-p, --port', 'set port')
  .action(async cmd => await testrpcStart(cmd))

program
  .command('migrate <network>')
  .usage('<network>')
  .description('migrate contracts')
  .action(network => migrateContracts(network))

program.parse(process.argv)
