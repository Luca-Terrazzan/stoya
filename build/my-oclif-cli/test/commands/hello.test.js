"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("@oclif/test");
describe('hello', function () {
    test_1.test
        .stdout()
        .command(['hello'])
        .it('runs hello', function (ctx) {
        test_1.expect(ctx.stdout).to.contain('hello world');
    });
    test_1.test
        .stdout()
        .command(['hello', '--name', 'jeff'])
        .it('runs hello --name jeff', function (ctx) {
        test_1.expect(ctx.stdout).to.contain('hello jeff');
    });
});
