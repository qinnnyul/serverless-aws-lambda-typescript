import {S3RetrieveService} from "../../main/service/s3-retrieve-servivce";
import {S3} from "aws-sdk";

describe('s3 object retriever', ()=> {
    it('should call s3client with relative parameters', ()=> {
        //given
        var s3Client = new S3();
        spyOn(s3Client, "getObject");
        var s3RetrieveService = new S3RetrieveService(s3Client);
        //when
        s3RetrieveService.getObject("fake bucket", "fake object key");
        //then
        expect(s3Client.getObject).toHaveBeenCalledTimes(1);
    });

    it('should call the real s3 client to get object', done=> {
        var s3 = new S3();

        var s3RetrieveService = new S3RetrieveService(s3);

        var s3Object = s3RetrieveService.getObject("lambda-claudiajs-s3-demo", "aws-nodejs-dev-hello.json");

        var expectedResult = {
            "dbapi": "https://localhost:8888/dev/api"
        };

        s3Object.promise().then(function (data) {
            expect(JSON.parse(data.Body.toString())).toEqual(expectedResult);
            done();
        })

    })


});