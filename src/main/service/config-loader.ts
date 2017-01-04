import {Context} from "aws-lambda";

export class ConfigLoader {

    private context: Context;

    public constructor(context: Context) {
        this.context = context;
    }

    public load(): any {

        var environment = this.context.invokedFunctionArn.replace(/.*:/g, '');

        var config = require('../config/' + environment + '.js');

        return config.environment;
    }
}