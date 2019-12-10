import 'colors';

import { Bar } from "cli-progress";
import * as config from '../config.json';
import { Exception } from './errors/exception.js';
import { GitManager } from './git-manager';
import { Logger } from './logger';
async function main() {

  // Execute script
  Logger.log('\n 💣  Starting the creation of release branches 💣\n'.underline.bold);

  const releases: Array<Promise<void>> = [];
  const progressBar = new Bar({
    format: '[{bar}] {percentage}% ',
  });
  progressBar.start(config.repositories.length * 4, 0);

  for (const repo of config.repositories) {
    Logger.logRepositoryMessage(repo, `🙏  Creating release for repository ${repo.bold}`.green);

    const gitMngr = new GitManager(repo, progressBar);

    // Launch all releases in parallel => no async/await here please!
    releases.push(gitMngr.createRelease(config.branches.master, config.branches.release, config.branches.development)
    .then(() => {
      progressBar.increment(1);
    })
    .catch((err: Exception) => {
      progressBar.increment(1);
      Logger.logRepositoryMessage(repo, `🚨 🚨 🚨  An error occurred while trying to create a `
      + `release for repo ${repo.bold} 🚨 🚨 🚨
      Please perform a manual check on this repo!`.red);
      Logger.logRepositoryMessage(repo, `Error was: `.red);
      Logger.logRepositoryMessage(repo, err);
    }),
    );
  }

  await Promise.all(releases);
  progressBar.update(config.repositories.length * 4);
  progressBar.stop();

  Logger.log(`\n\n🎊 🎊 🎊  Release Process Completed 🎊 🎊 🎊 `.green.bold);
  Logger.log(`\n\n 📖 Here is a complete log of what happenend ordered by folder: \n\n`.bold);
  Logger.printLogbookToConsole();
}

main();
