import http = require('http');


export class DataStoreService {

    public saveDataWithAPI(data: string, api: any) {

        var options = {
            protocol: api.protocol,
            hostname: api.hostname,
            port: api.port,
            path: api.path,
            method: 'POST',
            headers: {
                'Content-Length': Buffer.byteLength(data)
            }
        };
        console.log('make a call to api:' + JSON.stringify(api));
        var req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
        });

        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        req.write(data);
        req.end();
    }
}