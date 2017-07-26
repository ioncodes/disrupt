#!/usr/bin/env node

const commander = require('commander');
const Disassembler = require('./lib/disassembler.js');

commander
  .version('0.0.1')
  .usage('-f <file> -a <arch> -m <mode> [optional]')
  .option('-f, --file <file>', 'file to be disassembled')
  .option('-a, --arch <arch>', 'file architecture')
  .option('-m, --mode <mode>', 'file mode')
  .option('-v, --verbose', 'verbose output')
  .parse(process.argv);

if(commander.verbose) {
  console.log('File: ' + commander.file);
  console.log('Arch: ' + commander.arch);
  console.log('Mode: ' + commander.mode);
}

const disassembler = new Disassembler(commander.arch, commander.mode);

process.on('exit', function() {
  disassembler.close();
});

disassembler.disassemble(new Buffer([ 0x55, 0x48, 0x8b, 0x05, 0xb8, 0x13, 0x00, 0x00 ]), 0x1337);
