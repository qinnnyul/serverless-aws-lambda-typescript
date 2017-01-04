import {S3} from "aws-sdk";


export class S3RetrieveService {

    private s3Client: S3;

    public constructor(s3Client: S3) {
        this.s3Client = s3Client;
    }

    public getObject(bucket: string, objectKey: string) {

        return this.s3Client.getObject({
            Bucket: bucket,
            Key: objectKey
        });
    }

}
