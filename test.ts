import { description, name, version } from './package.json';

const options = process.argv.slice(2)

if (options.includes('--version')) {
  console.log(`NodeConf TS CLI workshop version ${version}`);

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

}

// Execute script
console.log('\nHello there 🙋‍♂️');
