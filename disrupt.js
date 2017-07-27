#!/usr/bin/env node

const commander = require('commander');
const colors = require('colors');
const Disassembler = require('./lib/disassembler.js');

commander
  .version('0.0.1')
  .option('-f, --file <file>', 'file to be disassembled')
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
}

function print(instructions) {
  instructions.forEach(function(instruction) {
    console.log(
      "0x%s:".cyan + "\t%s".green + "\t%s".magenta,
      instruction.address, instruction.opcode, instruction.operand,
    );
  });
}
