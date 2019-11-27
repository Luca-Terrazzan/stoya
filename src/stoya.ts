#!/usr/bin/env node

import { description, name, version } from '../package.json';
import { GitManager } from './git-manager';

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

  const gitmngr = new GitManager('.');
  const status = await gitmngr.getStatus();

  const localBranch = await gitmngr.checkoutReleaseBranchLocally('test');
  console.log(localBranch);

  process.exit(0);
}

main();