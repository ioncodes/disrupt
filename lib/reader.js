class Reader {
  constructor(buffer) {
    var BufferReader = require('buffer-reader');
    this.reader = new BufferReader(buffer);
  }

  read(offset, length) {
    this.reader.move(offset);
    return this.reader.nextBuffer(length);
  }
}

module.exports = Reader;
