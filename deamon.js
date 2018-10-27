const path = require('path')
const program = require('commander')
const { spawn } = require('child_process')

function migrate(options) {
  return new Promise((resolve,  reject) => {
    const contractMigrate = spawn(`sh ./migrate.sh ${options.network || 'local'}`, {
      cwd: path.join(__dirname, './src'),
      shell: true,
      stdio: 'inherit'
    })
    
    contractMigrate.on('error', error => reject(error))
    contractMigrate.on('exit', code => {
      if (code !== 0) {
        reject(new Error(`child_process exit with code ${code}`))
      }

      process.exitCode = 0
      resolve(true)
    })
  })
}

function deamonStart(options) {
  return new Promise((resolve, reject) => {
    if (options.host) {
      process.env.hostname = options.host
    }

    if (options.port) {
      process.env.port = options.port
    }

    const startTESTRPC = spawn('sh ./testrpc.sh', {
      cwd: path.join(__dirname, './src'),
      shell: true,
      stdio: 'inherit'
    })
    
    startTESTRPC.on('error', error => reject(error))
    startTESTRPC.on('exit', code => {
      (code !== 0)
        ? reject(new Error(`child_process exit with code ${code}`))   
        : resolve(true)
    })
  })
}

program
  .version(require('./package.json').version)
  .usage('<command> [options]')
  .description('Deamon for dc-protocol')

program
  .command('start')
  .description('Start test rpc')
  .option('-h, --host', 'set hostname')
  .option('-p, --port', 'set port')
  .action(async command => await deamonStart(command))

program
  .command('migrate')
  .description('Migrate contracts')
  .option('-n --network <blockchainNetwork>', 'Blockchain network for deploy contract')
  .action(async command => await migrate(command))

program.parse(process.argv)
