import {Context, Callback} from "aws-lambda";
import {S3RetrieveService} from "./s3RetrieveService";

exports.handleIt = function(event: any, context: Context, callback: Callback) {
    console.log('Processing : ' + JSON.stringify(event));

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'test for fun',
            input: event
        })
    }

    if (event.Records && event.Records[0]) {
        for (var i = 0; i < event.Records.length; i++) {
            var s3RetrieveService = new S3RetrieveService();
            var s3Object = s3RetrieveService.getObject(event.Records[i].s3.bucket.name, event.Records[i].s3.object.key);
            console.log('capture s3 object:' + s3Object);
        }

    } else {
        context.fail('unsupported event source');
    }
    callback(null, response);

};
