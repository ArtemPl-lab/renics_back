var fs = require('fs')
var Readable = require('stream').Readable


module.exports = function(base64) {
    const zipBuffer = Buffer.from(base64, 'base64')
    var s = new Readable();
    s.push(zipBuffer);
    s.push(null);
    s.pipe(fs.createWriteStream("application.zip"));
}