const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.lastLine = '';
  }

  _transform(chunk, encoding, callback) {
    const string = this.lastLine + chunk.toString();
    const lines = string.split(os.EOL);

    this.lastLine = lines[lines.length - 1];

    lines.slice(0, -1).forEach((line) => {
      this.push(line);
    });

    callback();
  }

  _flush(callback) {
    if (this.lastLine) {
      this.push(this.lastLine);
    }

    this.lastLine = '';
    callback();
  }
}

module.exports = LineSplitStream;
