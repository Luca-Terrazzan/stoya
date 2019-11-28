import 'colors';

import { Bar } from "cli-progress";
import * as config from '../config.json';
import { GitManager } from './git-manager';
import { error, log } from './logger';

async function main() {

  // Execute script
  log('\n 💣  Starting the creation of release branches 💣\n'.underline.bold);

  const releases: Array<Promise<void>> = [];
  const progressBar = new Bar({
    format: 'Creating release branches... [{bar}] {percentage}% | {value}/{total}',
  });
  progressBar.start(config.repositories.length, 0);

  for (const repo of config.repositories) {
    log(`🙏  Creating release for repository ${repo.bold}`.green);

    const gitMngr = new GitManager(repo);

    // Launch all releases in parallel => no async/await here please!
    releases.push(gitMngr.createRelease(config.branches.master, config.branches.release, config.branches.development)
    .then(() => {
      progressBar.increment(1);
    })
    .catch((/* err */) => {
      progressBar.increment(1);
      error(`🚨 🚨 🚨  An error occurred while trying to create a release for repo ${repo.bold} 🚨 🚨 🚨
      Please perform a manual check on this repo!`.red);
      // TODO: print out err in debug mode
    }),
    );
  }

  await Promise.all(releases);
  log(`\n\n🎊 🎊 🎊  Release Process Completed 🎊 🎊 🎊 `.green.bold);
  progressBar.stop();

}

main();
