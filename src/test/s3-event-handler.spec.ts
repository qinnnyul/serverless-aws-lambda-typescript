import {S3EventHandler} from "../main/s3-event-handler";
import {S3EventParser} from "../main/s3-event-parser";
import {S3RetrieveService} from "../main/s3-retrieve-servivce";
import {S3} from "aws-sdk";


describe('s3 event handler', () => {
    var classUnderTest: S3EventHandler;
    var mockS3EventParser: S3EventParser;

    beforeEach(() => {
        mockS3EventParser = new S3EventParser();
    });

    it('should process s3 event successfully ', () => {
        var lambdaEvent = {
            "Records": [
                {
                    "eventVersion": "2.0",
                    "eventSource": "aws:s3",
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
                    },
                    "s3": {
                        "s3SchemaVersion": "1.0",
                        "configurationId": "lambda-claudiajs-demo",
                        "bucket": {
                            "name": "lambda-claudiajs-s3-demo",
                            "ownerIdentity": {
                                "principalId": "A2OOYR1OP5W6US"
                            },
                            "arn": "arn:aws:s3:::lambda-claudiajs-s3-demo"
                        },
                        "object": {
                            "key": "aws-nodejs-dev-hello.json",
                            "size": 47,
                            "eTag": "50adb5b8f247bddc9f80478d4f505b4e",
                            "sequencer": "005868C690D192A1EE"
                        }
                    }
                }
            ]
        };
        var mockContext = jasmine.createSpyObj('mockContext', ['succeed']);

        classUnderTest = new S3EventHandler(mockS3EventParser, new S3RetrieveService(new S3()));
        classUnderTest.process(lambdaEvent, mockContext);

        expect(mockContext.succeed).toHaveBeenCalledWith('Success: ' + JSON.stringify(lambdaEvent));
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

        classUnderTest = new S3EventHandler(mockS3EventParser, mockS3RetrieveService);
        classUnderTest.process(snsEvent, mockContext);

        expect(mockContext.fail).toHaveBeenCalledWith('Error: Not support event type!!');

    })

});