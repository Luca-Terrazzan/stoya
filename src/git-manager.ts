import { Bar } from 'cli-progress';
import simplegit, { SimpleGit } from 'simple-git/promise';
import { StatusResult } from 'simple-git/typings/response';
import { Logger } from './logger';

export class GitManager {

  private readonly git: SimpleGit;

  constructor(private readonly folder: string, private readonly progressBar: Bar) {
    this.git = simplegit(folder);
    this.git.silent(true);
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
      Logger.logRepositoryMessage(this.folder, `⚠  Develop branch ${devBranch.bold} does not exist `
        + `in ${this.folder.bold} ⚠
        Aborting release 🤷`.yellow);
      return;
    }

    await this.git.checkout(masterBranch);
    await this.git.pull();

    await this.createReleaseBranch(releaseBranch, masterBranch);

    this.progressBar.increment(1);

    await this.git.mergeFromTo(devBranch, releaseBranch);

    this.progressBar.increment(1);
    // await this.git.push();
    this.progressBar.increment(1);

    Logger.logRepositoryMessage(this.folder, `🎉  Release completed for repo ${this.folder.bold} 🎉`.green);
  }

  private async hardReset() {
    try {
      this.git.reset('hard');
    } catch (e) {
      Logger.logRepositoryMessage(this.folder, `🐛 Cannot reset repo ${this.folder.bold} to current`
        + `branch ${(await this.getCurrentBranch()).bold} 🐛\nPlease perform a manual check here!`.red);
      throw e;
    }
  }

  /**
   * Creates a release branch. If the remote for this branch exists already an error is thrown.
   *
   * @throws Error Throws an error if
   */
  private async createReleaseBranch(releaseBranch: string, masterBranch: string): Promise<void> {
    // Verify that the release branch does not exist already
    try {
      await this.git.checkoutBranch(releaseBranch, masterBranch);
    } catch (e) {
      Logger.logRepositoryMessage(this.folder, `⚠  Release branch already existing for repo `
        + `${this.folder.bold}, using the existing one ⚠`.yellow);

      await this.git.checkout(releaseBranch);
    }
  }

}
