import {S3EventHandler} from "../../main/service/s3-event-handler";
import {S3EventParser} from "../../main/service/s3-event-parser";


describe('s3 event handler', () => {
    var classUnderTest: S3EventHandler;
    var mockS3EventParser: S3EventParser;

    beforeEach(() => {
        mockS3EventParser = new S3EventParser();
    });

    it('should handle error while it can not deal with event', () => {
        var snsEvent = {
            "Records": [
                {
                    "eventVersion": "2.0",
                    "eventSource": "aws:SNS",
                    "awsRegion": "us-east-1",
                    "eventTime": "2017-01-01T09:06:24.882Z",
                    "eventName": "ObjectCreated:Put",
                    "userIdentity": {
                        "principalId": "A2OOYR1OP5W6US"
                    },
                    "requestParameters": {
                        "sourceIPAddress": "202.66.38.130"
                    },
                    "responseElements": {
                        "x-amz-request-id": "C16C0AD6CA930871",
                        "x-amz-id-2": "ZZsX0La5AS8slOUF41sdMGzlTqgZEIhyLS4qR6fLtwakSoGQ/oHMqyBV4xMeUIym"
                    }
                }
            ]
        };
        var mockContext = jasmine.createSpyObj('mockContext', ['fail']);
        var mockS3RetrieveService = jasmine.createSpyObj('mockS3RetrieveService', ['getObject']);
        var mockDataStoreService = jasmine.createSpyObj('mockDataStoreService', ['saveDataWithAPI']);
        var mockConfigLoader = jasmine.createSpyObj('mockConfigLoader', ['load']);

        classUnderTest = new S3EventHandler(mockS3EventParser, mockS3RetrieveService, mockDataStoreService, mockConfigLoader);
        classUnderTest.process(snsEvent, mockContext);

        expect(mockContext.fail).toHaveBeenCalledWith('Error: Not support event type!!');

    });
});