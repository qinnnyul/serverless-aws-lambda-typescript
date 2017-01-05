import {Context} from "aws-lambda";

export class ConfigLoader {

    private context: Context;

    public constructor(context: Context) {
        this.context = context;
    }

    public load(): any {

        var environment = this.context.invokedFunctionArn.replace(/.*:/g, '');

        console.log("environment:" + environment);

        if (environment.indexOf("serverless") == -1) {
            environment = "serverless-local-s3-event-proccessor";
        }

        var config = require('../../config/' + environment);

        return config.environment;
    }
}