import {Context} from "aws-lambda";
import {S3RetrieveService} from "./s3-retrieve-servivce";
import {S3EventParser} from "./s3-event-parser";

export class S3EventHandler {
    private s3EventParser: S3EventParser;
    private s3RetrieveService: S3RetrieveService;

    public constructor(s3EventParser: S3EventParser, s3RetrieveService: S3RetrieveService) {
        this.s3EventParser = s3EventParser;
        this.s3RetrieveService = s3RetrieveService;
    }

    public process(lambdaEvent: any, context: Context) {
        try {
            var s3Events = this.s3EventParser.parse(lambdaEvent);

            for (var s3Event of s3Events) {
                var s3Object = this.s3RetrieveService.getObject(s3Event.bucketName, s3Event.objectKey);
                s3Object.promise().then(function (data) {
                    console.log(data.Body);
                });
            }
            context.succeed('Success: ' + JSON.stringify(lambdaEvent));
        } catch (ex) {
            context.fail('Error: ' + ex.message);
        }
    }
}