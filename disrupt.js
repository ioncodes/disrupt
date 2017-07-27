#!/usr/bin/env node

const commander = require('commander');
const colors = require('colors');
const fs = require('fs');
const Disassembler = require('./lib/disassembler.js');
const Reader = require('./lib/reader.js');

commander
  .version('0.0.1')
  .option('-f, --file <file>', 'file to be disassembled')
  .option('-l, --length <length>', 'amount of bytes to read from the specified offset')
  .option('-b, --buffer <buffer>', 'read buffer from arg')
  .option('-o, --offset <offset>', 'offset to read from')
  .option('-a, --arch <arch>', 'file architecture')
  .option('-m, --mode <mode>', 'file mode')
  .option('-v, --verbose', 'verbose output')
  .parse(process.argv);

if (commander.verbose) {
  console.log('File:   ' + commander.file);
  console.log('Buffer: ' + commander.buffer);
  console.log('Offset: ' + commander.offset);
  console.log('Length: ' + commander.length);
  console.log('Arch:   ' + commander.arch);
  console.log('Mode:   ' + commander.mode);
}

const disassembler = new Disassembler(commander.arch, commander.mode);

process.on('exit', function() {
  if (commander.verbose) {
    console.log('Closing buffer');
  }
  disassembler.close();
});

if (commander.buffer) {
  var buffer = commander.buffer.split(',').map(Number);
  var instructions = disassembler.disassemble(Buffer.from(buffer), parseInt(commander.offset));
  print(instructions);
} else {
  var reader = new Reader(fs.readFileSync(commander.file));
  var buffer = reader.read(parseInt(commander.offset), parseInt(commander.length));
  var instructions = disassembler.disassemble(Buffer.from(buffer), parseInt(commander.offset));
  print(instructions);
}

function print(instructions) {
  instructions.forEach(function(instruction) {
    console.log(
      "0x%s:".cyan + "\t%s".green + "\t%s".magenta,
      instruction.address, instruction.opcode, instruction.operand,
    );
  });
}
