#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var package_json_1 = require("./package.json");
var options = process.argv.slice(2);
if (options.includes('--version')) {
    console.log(package_json_1.name + " version " + package_json_1.version);
    process.exit(0);
}
if (options.includes('--help')) {
    var helpMessage = "\n    " + package_json_1.name + " version " + package_json_1.version + "\n    " + package_json_1.description + "\n\n    Usages:\n\n    --help Show this screen\n    --version Show currently installed version\n  ";
    console.log(helpMessage);
    process.exit(0);
}
// Execute script
console.log('\nHello there2 🙋‍♂️');
process.exit(0);
