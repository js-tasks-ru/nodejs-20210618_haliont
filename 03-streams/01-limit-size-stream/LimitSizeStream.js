const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit;
    this.totalBytesLength = 0;
  }

  _transform(chunk, encoding, callback) {
    this.totalBytesLength += chunk.byteLength;
    const isLimitExceeded = this.totalBytesLength > this.limit;

    if (isLimitExceeded) {
      callback(new LimitExceededError());
    } else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
