const soap = require('soap');
const fs = require('fs');
const path = require("path");
const GetVersions = require('./methods/GetVersions');

const xml = fs.readFileSync(path.resolve(__dirname, 'InterfaceVersion.wsdl'), 'utf8');
const service = {
	InterfaceVersion: {
		InterfaceVersionSoap: {
            GetVersions
	    },
        InterfaceVersionSoap12: {
            GetVersions
        }
	}
};

module.exports = function(app){
    const wsdl_path = '/ws/InterfaceVersion';
    const server = soap.listen(app, {
        path: wsdl_path,
        services: service,
        xml: xml.replace('{appHost}', app.get('url')),
        overrideRootElement: {
            namespace: 'm',
            xmlnsAttributes: [
                {
                    name: 'xmlns:m',
                    value: "http://www.1c.ru/SaaS/1.0/WS"
                }
            ]
        },
        xmlKey: 'xml'
    });

    // logger   
    server.log = console.log;
}