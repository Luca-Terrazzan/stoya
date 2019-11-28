import 'colors';

import * as config from '../config.json';
import { description, name, version } from '../package.json';
import { GitManager } from './git-manager';
import { release } from 'os';

async function main() {

  const options = process.argv.slice(2);

  if (options.includes('--version')) {
    console.log(`${name} version ${version}`);

    process.exit(0);
  }

  if (options.includes('--help')) {
    const helpMessage = `
      ${name} version ${version}
      ${description}

      Usages:

      --help Show this screen
      --version Show currently installed version
    `;

    console.log(helpMessage);

    process.exit(0);
  }

  // Execute script
  console.log('\n 💣  Starting the creation of release branches 💣\n'.underline.bold);

  const releases: Array<Promise<void>> = [];

  for (const repo of config.repositories) {
    console.log(`🙏  Creating release for repository ${repo.bold}`.green);

    const gitMngr = new GitManager(repo);

    // Launch all releases in parallel => no async/await here please!

    releases.push(gitMngr.createRelease(config.branches.master, config.branches.release, config.branches.development)
      .catch((err) => {
        console.error(`🚨 🚨 🚨  An error occurred while trying to create a release for repo ${repo.bold} 🚨 🚨 🚨
          Please perform a manual check on this repo!`.red);
      }),
    );
  }

  await Promise.all(releases);
  console.log(`\n\n🎊 🎊 🎊  Release Process Completed 🎊 🎊 🎊 `.green.bold);

}

main();
