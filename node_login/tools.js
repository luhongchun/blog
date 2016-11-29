//转码
var encoding = require('encoding');

var encodingparser = function(res, done) {
  res.text = '';
  res.setEncoding('binary');
  res.on('data', function(chunk) {
    res.text += chunk;
  });
  res.on('end', function() {
    res.text = encoding.convert(res.text, 'UTF8', 'GBK').toString();
    done();
  });
};

exports.encodingparser = encodingparser;
