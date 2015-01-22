var xmlStream = require('xml-stream');
var through = require('through2');
var split = require('split');

function Burpstream() {
}

Burpstream.prototype.fromStream = function fromStream (inStream) {
  var limited = inStream
  .pipe(split())
  .pipe(through(function (chunk, enc, cb) {
    if (chunk.length < 4096) {
      this.push(chunk);
    }
    cb();
  }));
  this.stream = new xmlStream(limited);
  return this.stream;
};

module.exports = Burpstream;

