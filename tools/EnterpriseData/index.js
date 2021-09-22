const InterfaceVersionServiceStart = require('./services/InterfaceVersion');
const ExchangeServiceStart = require('./services/Exchange');
module.exports = function(app){
    InterfaceVersionServiceStart(app);
    ExchangeServiceStart(app);
}