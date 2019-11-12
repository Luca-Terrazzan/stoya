nodeconf-oclif-test
===================

NodeConf2019 test with oclif

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/nodeconf-oclif-test.svg)](https://npmjs.org/package/nodeconf-oclif-test)
[![Downloads/week](https://img.shields.io/npm/dw/nodeconf-oclif-test.svg)](https://npmjs.org/package/nodeconf-oclif-test)
[![License](https://img.shields.io/npm/l/nodeconf-oclif-test.svg)](https://github.com/Luca-Terrazzan/ts-cli-test/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g nodeconf-oclif-test
$ nodeconf-oclif-test COMMAND
running command...
$ nodeconf-oclif-test (-v|--version|version)
nodeconf-oclif-test/0.0.0 darwin-x64 node-v12.12.0
$ nodeconf-oclif-test --help [COMMAND]
USAGE
  $ nodeconf-oclif-test COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nodeconf-oclif-test hello [FILE]`](#nodeconf-oclif-test-hello-file)
* [`nodeconf-oclif-test help [COMMAND]`](#nodeconf-oclif-test-help-command)

## `nodeconf-oclif-test hello [FILE]`

describe the command here

```
USAGE
  $ nodeconf-oclif-test hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ nodeconf-oclif-test hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/Luca-Terrazzan/ts-cli-test/blob/v0.0.0/src/commands/hello.ts)_

## `nodeconf-oclif-test help [COMMAND]`

display help for nodeconf-oclif-test

```
USAGE
  $ nodeconf-oclif-test help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_
<!-- commandsstop -->
