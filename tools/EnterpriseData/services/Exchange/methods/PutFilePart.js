const base64ToZip = require('../../../includes/base64ToZip');

module.exports = function(args) {
    base64ToZip(args.PartData);
    return {
        xml: `
        <m:return xmlns:xs="http://www.w3.org/2001/XMLSchema"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>`
    }
}