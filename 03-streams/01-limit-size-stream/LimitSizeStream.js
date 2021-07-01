const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit;
    this.chunks = [];
  }

  _transform(chunk, encoding, callback) {
    this.chunks.push(chunk);
    const chunksByteLength = Buffer.concat(this.chunks).byteLength;

    const isLimitExceeded = chunksByteLength > this.limit;

    if (isLimitExceeded) {
      callback(new LimitExceededError());
    } else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
