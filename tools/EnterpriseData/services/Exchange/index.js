const soap = require('soap');
const fs = require('fs');
const path = require("path");

const methods = {
    Ping: require('./methods/Ping'),
    GetIBParameters: require('./methods/GetIBParameters'),
    CreateExchangeNode: require('./methods/CreateExchangeNode'),
    TestConnection: require('./methods/TestConnection'),
    PutFilePart: require('./methods/PutFilePart')
}
const xml = fs.readFileSync(path.resolve(__dirname, 'Exchange_3_0_1_1.wsdl'), 'utf8');
const service = {
	Exchange_3_0_1_1: {
		Exchange_3_0_1_1Soap: {
            ...methods
	    },
        Exchange_3_0_1_1Soap12: {
            ...methods
        }
	}
};

module.exports = function(app){
    const wsdl_path = '/ws/Exchange_3_0_1_1';
    const server = soap.listen(app, {
        path: wsdl_path,
        services: service,
        xml: xml.replace('{appHost}', app.get('url')),
        overrideRootElement: {
            namespace: 'm',
            xmlnsAttributes: [
                {
                    name: 'xmlns:m',
                    value: "http://www.1c.ru/SSL/Exchange_3_0_1_1"
                }
            ]
        },
        xmlKey: 'xml'
    });

    // logger   
    server.log = console.log;
}