const fs = require('fs');
const path = require("path");

module.exports = function(args) {
    return {
        xml: fs.readFileSync(path.resolve(__dirname, '../IBParametrs.xml'), 'utf8')
    }
}