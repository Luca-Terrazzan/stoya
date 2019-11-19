#!/usr/bin/env node

import { description, name, version } from './package.json';

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
console.log('\nHello there 🙋‍♂️');

process.exit(0);
