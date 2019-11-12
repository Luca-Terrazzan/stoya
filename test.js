"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var package_json_1 = require("./package.json");
var options = process.argv.slice(2);
if (options.includes('--version')) {
    console.log("NodeConf TS CLI workshop version " + package_json_1.version);
}
if (options.includes('--help')) {
    var helpMessage = "\n    " + package_json_1.description + "\n    " + package_json_1.name + " version " + package_json_1.version + "\n\n    Usages:\n\n    --help Show this screen\n    --version Show currently installed version\n  ";
    console.log(helpMessage);
}
// Execute script
console.log('\nHello there 🙋‍♂️');
