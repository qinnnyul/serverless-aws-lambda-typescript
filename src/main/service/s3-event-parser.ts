import {S3Event} from "../model/s3-event";

export class S3EventParser {

    public parse(lambdaEvent: any): S3Event[] {
        var result: any[] = [];
        lambdaEvent.Records.forEach(function (record) {
            if (record.eventSource === 'aws:s3') {
                result.push(new S3Event(record.s3.bucket.name, record.s3.object.key));
            }
        });

        if (result.length === 0) {
            throw new Error("Not support event type!!");
        }
        return result;
    }
}