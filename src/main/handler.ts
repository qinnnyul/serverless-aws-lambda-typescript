import {S3} from "aws-sdk";
import {S3RetrieveService} from "./service/s3-retrieve-servivce";
import {S3EventParser} from "./service/s3-event-parser";
import {S3EventHandler} from "./service/s3-event-handler";
import {Context} from "aws-lambda";

exports.handleIt = (lambdaEvent: any, context: Context) => {
    var s3EventHandler = new S3EventHandler(new S3EventParser(), new S3RetrieveService(new S3()));
    return s3EventHandler.process(lambdaEvent, context);
}
