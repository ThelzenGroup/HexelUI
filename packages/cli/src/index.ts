import { Command } from 'commander'
import { init } from './commands/init'
import { add } from './commands/add'

const program = new Command()

program
  .name('hexelui')
  .description('Add HexelUI components to your project')
  .version('0.1.0')

program
  .command('init')
  .description('Initialize HexelUI in your project')
  .option('-y, --yes', 'Skip prompts and use defaults', false)
  .action(init)

program
  .command('add [components...]')
  .description('Add components to your project')
  .option('-o, --overwrite', 'Overwrite existing files', false)
  .action(add)

program.parse()
