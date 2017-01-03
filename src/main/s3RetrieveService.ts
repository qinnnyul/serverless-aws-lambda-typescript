import {S3} from "aws-sdk";


export class S3RetrieveService {

    getObject(bucket: string, objectKey: string) {
        var s3 = new S3();

        return s3.getObject({
            Bucket: bucket,
            Key: objectKey
        });
    }

}
