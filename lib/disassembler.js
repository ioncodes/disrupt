class Disassembler {
  constructor(arch, _mode) {
    this.capstone = require('capstone');
    var architecture = this.getArchitecture(arch);
    var mode = this.getMode(_mode);
    this.cs = new this.capstone.Cs(architecture, mode);
  }

  disassemble(buffer, offset) {
    var instructions = [];
    this.cs.disasm(buffer, offset).forEach(function(instruction) {
      instructions.push({
        'address': instruction.address.toString(16),
        'opcode': instruction.mnemonic,
        'operand': instruction.op_str
      });
    });
    return instructions;
  }

  close() {
    this.cs.close();
  }

  getArchitecture(arch) {
    switch (arch.toUpperCase()) {
      case 'ARM':
        return this.capstone.ARCH_ARM;
        break;
      case 'ARM64':
        return this.capstone.ARCH_ARM64;
        break;
      case 'MIPS':
        return this.capstone.ARCH_MIPS;
        break;
      case 'X86':
        return this.capstone.ARCH_X86;
        break;
      case 'PPC':
        return this.capstone.ARCH_PPC;
        break;
      case 'SPARC':
        return this.capstone.ARCH_SPARC;
        break;
      case 'SYSZ':
        return this.capstone.ARCH_SYSZ;
        break;
      case 'XCORE':
        return this.capstone.ARCH_XCORE;
        break;
      default:
        console.log('Invalid architecture');
        process.exit(-1);
    }
  }

  getMode(mode) {
    switch (mode.toUpperCase()) {
      case 'LE':
        return this.capstone.MODE_LITTLE_ENDIAN;
        break;
      case 'ARM':
        return this.capstone.MODE_ARM;
        break;
      case '16':
        return this.capstone.MODE_16;
        break;
      case '32':
        return this.capstone.MODE_32;
        break;
      case '64':
        return this.capstone.MODE_64;
        break;
      case 'THUMB':
        return this.capstone.MODE_THUMB;
        break;
      case 'MCLASS':
        return this.capstone.MODE_MCLASS;
        break;
      case 'MICRO':
        return this.capstone.MODE_MICRO;
        break;
      case 'MIPS3':
        return this.capstone.MODE_MIPS3;
        break;
      case 'MIPS32R6':
        return this.capstone.MODE_MIPS32R6;
        break;
      case 'MIPSGP64':
        return this.capstone.MODE_MIPSGP64;
        break;
      case 'V9':
        return this.capstone.MODE_V9;
        break;
      case 'BE':
        return this.capstone.MODE_BIG_ENDIAN;
        break;
      default:
        console.log('Invalid mode');
        process.exit(-1);
    }
  }
}

module.exports = Disassembler;
