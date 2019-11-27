import simplegit, { SimpleGit } from "simple-git/promise";
// import simplegit = require("simple-git/promise");

export class GitManager {

  private readonly git: SimpleGit;

  constructor(private readonly folder: string) {
    this.git = simplegit(folder);
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

}
