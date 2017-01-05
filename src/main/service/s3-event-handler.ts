import {Context} from "aws-lambda";
import {S3RetrieveService} from "./s3-retrieve-servivce";
import {S3EventParser} from "./s3-event-parser";
import {DataStoreService} from "./data-store-service";
import {ConfigLoader} from "./config-loader";

export class S3EventHandler {
    private s3EventParser: S3EventParser;
    private s3RetrieveService: S3RetrieveService;
    private dataStoreService: DataStoreService;
    private configLoader: ConfigLoader;


    public constructor(s3EventParser: S3EventParser, s3RetrieveService: S3RetrieveService, dataStoreService: DataStoreService, configLoader: ConfigLoader) {
        this.s3EventParser = s3EventParser;
        this.s3RetrieveService = s3RetrieveService;
        this.dataStoreService = dataStoreService;
        this.configLoader = configLoader;
    }

    public process(lambdaEvent: any, context: Context) {
        try {
            console.log("processing: " + JSON.stringify(lambdaEvent));
            var s3Events = this.s3EventParser.parse(lambdaEvent);
            var environment = this.configLoader.load();
            var saveDataWithAPI = this.dataStoreService.saveDataWithAPI;

            for (var s3Event of s3Events) {
                var s3Object = this.s3RetrieveService.getObject(s3Event.bucketName, s3Event.objectKey);
                s3Object.promise().then(function (data) {
                    saveDataWithAPI(data.Body.toString(), environment.endpoint);
                });
            }
        } catch (ex) {
            context.fail('Error: ' + ex.message);
        }
    }
}