# disrupt
disrupt is a small commandline utility to disassemble files quickly. You can set the architecture, mode and assembly syntax. Additionally, parsing a buffer from the commandline is possible aswell.

# Example
```disrupt -a X86 -m 64 -o 0x1337 -b '0x55,0x48,0x8b,0x05,0xb8,0x13,0x00,0x00'``` gives you this:  
```asm
0x1337: push    rbp
0x1338: mov     rax, qword ptr [rip + 0x13b8]
```

# Help
Running ```disrupt --help``` shows you the help menu:  
```
Usage: disrupt [options]


Options:

  -V, --version          output the version number
  -f, --file <file>      file to be disassembled
  -b, --buffer <buffer>  read buffer from arg
  -o, --offset <offset>  offset to read from
  -a, --arch <arch>      file architecture
  -m, --mode <mode>      file mode
  -v, --verbose          verbose output
  -h, --help             output usage information
```

# Architectures and runtime modes
disrupt supports all architectures and modes that ```capstone``` also supports. Here is a list (taken from node-capstone):

```
* ARCH_ARM | ARM architecture (including Thumb, Thumb-2)
* ARCH_ARM64 | ARM-64 architecture, also called AArch64
* ARCH_MIPS | MIPS architecture
* ARCH_PPC | PowerPC architecture
* ARCH_X86 | X86 architecture (including x86 and x86_64)
* ARCH_SPARC | Sparc architecture
* ARCH_SYSZ | SystemZ architecture
* ARCH_XCORE | XCore architecture
```

```
* - `MODE_LITTLE_ENDIAN`: Little endian mode (default)
* - `MODE_BIG_ENDIAN`: Big endian mode
* - `MODE_16`: 16-bit mode
* - `MODE_32`: 32-bit mode
* - `MODE_64`: 64-bit mode
*
* ARM Architecture:
*
* - `MODE_ARM`: 32-bit ARM
* - `MODE_THUMB`: ARM's Thumb mode, including Thumb-2
* - `MODE_MCLASS`: ARM's Cortex-M series
*
* MIPS Architecture:
*
* - `MODE_MICRO`: MicroMips mode
* - `MODE_MIPS3`: Mips III ISA
* - `MODE_MIPS32R6`: Mips32r6 ISA
* - `MODE_MIPSGP64`: General Purpose Registers are 64-bit wide
*
* Sparc Architecture:
*
* - `MODE_V9`: SparcV9 mode (Sparc architecture)
```

However, the names are slightly different in disrupt, this is the list:  

```js
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
```

```js
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
```

# Features

- [x] Disassemble from buffer
- [ ] Disassemble from file
- [ ] Auto detect architecture and mode
- [ ] Choose assembly syntax
- [ ] Assembly syntax highlighting
