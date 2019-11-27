import simplegit, { SimpleGit } from "simple-git/promise";
// import simplegit = require("simple-git/promise");

export class GitManager {

  private readonly git: SimpleGit;
  private repo: string;

  constructor(private readonly folder: string) {
    this.git = simplegit(folder);
    this.repo = '';
  }

  public async init() {
    if (!this.git.checkIsRepo()) {
      console.error(`Folder ${this.folder} is not a git repo!`);
      throw new Error(`Folder ${this.folder} is not a git repo!`);
    }

    this.repo = (await this.git.getRemotes(true))[0].refs.fetch;
  }

  public async getStatus() {
    return await this.git.status();
  }

  public async getCurrentBranch() {
    return (await this.git.status()).current;
  }

  public async checkoutReleaseBranchLocally(branch: string) {
    return await this.git.checkoutLocalBranch(branch);
  }

  public async hardReset() {
    try{
      this.git.reset('hard');
    } catch (e) {
      console.error(`Cannot reset repo ${this.repo} to current branch ${this.getCurrentBranch()}`);
      throw e;
    }
  }

  public async createRelease(masterBranch: string, releaseBranch: string, devBranch: string) {
    await this.hardReset();

    await this.git.checkoutLocalBranch(devBranch);
    await this.git.pull();

    await this.git.checkoutLocalBranch(masterBranch);
    await this.git.pull();

    await this.git.checkoutBranch(releaseBranch, masterBranch);

    await this.git.mergeFromTo(devBranch, releaseBranch);
  }

}
