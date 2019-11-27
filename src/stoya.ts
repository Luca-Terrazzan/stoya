#!/usr/bin/env node

import { description, name, version } from '../package.json';
import { GitManager } from './git-manager';
import { repositories } from "../repositories.json";

async function main() {

  const options = process.argv.slice(2)

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
  console.log('\nStarting the creation of release branches 🙋‍♂️');

  for (const repo of repositories) {
    console.log(`Creating release for repository ${repo}`);

    const gitMngr = new GitManager(repo);
    await gitMngr.init();
    gitMngr.createRelease('maintenance/weekly-70', 'la/reports/release/release-test', 'la/reports/develop');
  }

}

main();
