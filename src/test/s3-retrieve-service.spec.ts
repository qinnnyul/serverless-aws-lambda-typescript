import {S3RetrieveService} from "../main/s3-retrieve-servivce";
import {S3} from "aws-sdk";

describe('should call s3 client to retrieve object', function () {
    it('s3 client will be call with relative parameters', function () {
        //given
        var s3Client = new S3();
        spyOn(s3Client, "getObject");
        var s3RetrieveService = new S3RetrieveService(s3Client);
        //when
        s3RetrieveService.getObject("fake bucket", "fake object key");
        //then
        expect(s3Client.getObject).toHaveBeenCalledTimes(1);
    })
});