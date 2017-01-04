import {ConfigLoader} from "../../main/service/config-loader";
import {Context} from "aws-lambda";

describe('config loader for different environments', () => {
    it('should load conf for prod ', () => {
        var mockContext: Context;

        mockContext = <Context>{
            callbackWaitsForEmptyEventLoop: false,
            functionName: 'mock',
            functionVersion: 'version',
            invokedFunctionArn: 'arn:aws:lambda:us-east-1:669606450274:function:serverless-prod-s3-event-proccessor',
            memoryLimitInMB: 128,
            awsRequestId: 'mock',
            logGroupName: 'mock',
            logStreamName: 'mock'
        };

        var configLoader = new ConfigLoader(mockContext);
        var config = configLoader.load();

        expect(config.someAPI).toEqual("https://jsonplaceholder.typicode.com/posts");
    });

    it('should load conf for dev ', () => {
        var mockContext: Context;

        mockContext = <Context>{
            callbackWaitsForEmptyEventLoop: false,
            functionName: 'mock',
            functionVersion: 'version',
            invokedFunctionArn: 'arn:aws:lambda:us-east-1:669606450274:function:serverless-dev-s3-event-proccessor',
            memoryLimitInMB: 128,
            awsRequestId: 'mock',
            logGroupName: 'mock',
            logStreamName: 'mock'
        };

        var configLoader = new ConfigLoader(mockContext);
        var config = configLoader.load();

        expect(config.someAPI).toEqual("https://jsonplaceholder.typicode.com/comments");
    });
});