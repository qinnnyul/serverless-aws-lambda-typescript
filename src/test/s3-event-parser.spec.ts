import {S3EventParser} from "../main/s3-event-parser";

describe('s3 event parser', function () {
    it('should parse s3 event from lambda event', function () {
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
        var s3EventParser = new S3EventParser();
        var result = s3EventParser.parse(lambdaEvent);
        expect(result[0].bucketName).toEqual("lambda-claudiajs-s3-demo");
        expect(result[0].objectKey).toEqual("aws-nodejs-dev-hello.json");
    });

    it('should throw out error when lambda event can not be parsed', function () {
        var lambdaEvent = {
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
        var s3EventParser = new S3EventParser();
        expect(function () {
            s3EventParser.parse(lambdaEvent)
        }).toThrow(new Error("Not support event type!!"));
    })

})