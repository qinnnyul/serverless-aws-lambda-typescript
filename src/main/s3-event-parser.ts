import {S3Event} from "./model/S3Event";

export class S3EventParser {

    parse(lambdaEvent: any): S3Event[] {
        var result: any[] = [];
        var eventRecord = lambdaEvent.Records && lambdaEvent.Records[0];

        lambdaEvent.Records.forEach(function (record) {
            if (record.eventSource === 'aws:s3') {
                result.push({
                    bucketName: record.s3.bucket.name,
                    objectKey: record.s3.object.key
                });
            }
        });

        if (!eventRecord || result.length === 0) {
            throw new Error("Not support event type!!");
        }
        return result;
    }
}