var Burpstream = require('./Burpstream');
var EventEmitter = require('events').EventEmitter;

// 
// Return an 'item' event emitter where each item contains the fields:
//
//    var res = {
//      method: ...
//      host: ...
//      url:  ...
//      request: ...
//      response: ...
//    };
//
module.exports = function parse(inStream) {
  var stream = new Burpstream();
  stream = stream.fromStream(inStream);
  var emitter = new EventEmitter();

  stream.collect('item');

  function decode(item) {
    if (item && item.$text && item.$ && item.$.base64 === 'true') {
      item.$text = new Buffer(item.$text, 'base64').toString();
    }
  }

  stream.on('endElement: item', function (item) {
    decode(item.request);
    decode(item.response);

    var res = {
      method: item.method,
      host: item.host.$text,
      url: item.url,
      request: item.request && item.request.$text ? item.request.$text : null,
      response: item.response && item.response.$text ? item.response.$text : null,
    };

    emitter.emit('item', res);

  });

  stream.on('end', function() {
    emitter.emit('end');
  });

  return emitter;
};

