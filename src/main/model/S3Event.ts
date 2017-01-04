export class S3Event {
    public bucketName: string;
    public objectKey: string;

    public constructor(bucketName: string, objectKey: string) {
        this.bucketName = bucketName;
        this.objectKey = objectKey;
    }



}