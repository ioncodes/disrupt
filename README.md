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
