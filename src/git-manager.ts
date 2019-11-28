import simplegit, { SimpleGit } from "simple-git/promise";
import 'colors';

export class GitManager {

  private readonly git: SimpleGit;
  private repo: string;

  constructor(private readonly folder: string) {
    this.git = simplegit(folder);
    this.repo = '';
  }

  public async init() {
    if (!this.git.checkIsRepo()) {
      console.error(`Folder ${this.folder} is not a git repo!`.red);
      throw new Error(`Folder ${this.folder} is not a git repo!`);
    }

    this.repo = (await this.git.getRemotes(true))[0].refs.fetch;
  }

  public async getStatus() {
    return await this.git.status();
  }

  public async getCurrentBranch(): Promise<string> {
    return (await this.git.status()).current;
  }

  private async checkoutReleaseBranchLocally(branch: string) {
    return await this.git.checkoutLocalBranch(branch);
  }

  private async hardReset() {
    try{
      this.git.reset('hard');
    } catch (e) {
      console.error(`🐛 Cannot reset repo ${this.repo.bold} to current branch ${(await this.getCurrentBranch()).bold} 🐛`.red);
      throw e;
    }
  }

  private async createReleaseBranch(releaseBranch: string, masterBranch: string) {
    try {
      await this.git.checkoutBranch(releaseBranch, masterBranch);
    } catch (e) {
      console.error(`⚠  Release branch already existing for repo ${this.repo.bold}, resetting it back to ${masterBranch.bold} ⚠`.yellow);

      await this.git.checkout(releaseBranch);
      await this.git.reset(['--hard', `${masterBranch}`]);
    }
  }

  public async createRelease(masterBranch: string, releaseBranch: string, devBranch: string) {
    await this.hardReset();

    try {
      await this.git.checkout(devBranch);
      await this.git.pull();
    } catch(developBranchError) {
      console.log(`⚠  Develop branch ${devBranch.bold} does not exist in ${this.folder.bold} ⚠\nAborting release 🤷`.yellow);
      return;
    }

    await this.git.checkout(masterBranch);
    await this.git.pull();

    await this.createReleaseBranch(releaseBranch, masterBranch);

    await this.git.mergeFromTo(devBranch, releaseBranch);

    // await this.git.push();

    console.log(`🎉  Release completed for repo ${this.folder.bold} 🎉`.green);
  }

}
