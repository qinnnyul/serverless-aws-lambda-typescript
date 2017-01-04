import {Context} from "aws-lambda";

export class ConfigLoader {

    private context: Context;

    public constructor(context: Context) {
        this.context = context;
    }

    public load() {
        var environment = this.context.invokedFunctionArn.replace(/.*:/g, '');

        return require('./' + environment + '.js');
    }
}