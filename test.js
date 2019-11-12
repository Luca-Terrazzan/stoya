#!/usr/bin/env node

const { description, name, version } = require('./package.json')

const options = process.argv.slice(2)

if (options.includes('--version')) {
  console.log(`NodeConf TS CLI workshop version ${version}`);

  return;
}

if (options.includes('--help')) {
  const helpMessage = `
    ${description}
    ${name} version ${version}

    Usages:

    --help Show this screen
    --version Show currently installed version
  `;

  console.log(helpMessage);

  return;
}

// Execute script
console.log('\nHello there 🙋‍♂️');
