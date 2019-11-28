import 'colors';

import simplegit, { SimpleGit } from 'simple-git/promise';
import { StatusResult } from 'simple-git/typings/response';

export class GitManager {

  private readonly git: SimpleGit;
  private repo: string;

  constructor(private readonly folder: string) {
    this.git = simplegit(folder);
    this.git.silent(true);
    this.repo = '';
  }

  public async getStatus(): Promise<StatusResult> {
    return await this.git.status();
  }

  public async getCurrentBranch(): Promise<string> {
    return (await this.git.status()).current;
  }

  public async createRelease(masterBranch: string, releaseBranch: string, devBranch: string): Promise<void> {
    await this.hardReset();

    await this.git.fetch(undefined, undefined, ['--all']);

    try {
      await this.git.checkout(devBranch);
      await this.git.pull();
    } catch (developBranchError) {
      console.log(`⚠  Develop branch ${devBranch.bold} does not exist in ${this.folder.bold} ⚠
        Aborting release 🤷`.yellow);
      return;
    }

    await this.git.checkout(masterBranch);
    await this.git.pull();

    await this.createReleaseBranch(releaseBranch, masterBranch);

    await this.git.mergeFromTo(devBranch, releaseBranch);

    // await this.git.push();

    console.log(`🎉  Release completed for repo ${this.folder.bold} 🎉`.green);
  }

  private async hardReset() {
    try {
      this.git.reset('hard');
    } catch (e) {
      console.error(`🐛 Cannot reset repo ${this.folder.bold} to current branch ${(await this.getCurrentBranch()).bold} 🐛\nPlease perform a manual check here!`.red);
      throw e;
    }
  }

  private async createReleaseBranch(releaseBranch: string, masterBranch: string) {
    try {
      await this.git.checkoutBranch(releaseBranch, masterBranch);
    } catch (e) {
      console.error(`⚠  Release branch already existing for repo ${this.folder.bold}, resetting it back to ${masterBranch.bold} ⚠`.yellow);

      await this.git.checkout(releaseBranch);
      await this.git.reset(['--hard', `${masterBranch}`]);
    }
  }

}
