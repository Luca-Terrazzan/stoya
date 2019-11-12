import { Command } from '@oclif/command'

export class MyCommand extends Command {
  static description = 'description of this example command'

  async run() {
    console.log('running my command')
  }
}
