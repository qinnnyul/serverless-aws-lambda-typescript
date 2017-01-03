Install node.js packages and install serverless:
```bash
npm i
npm install -g serverless
```

For unit test, lambda testing, please install the following package globally
```bash
npm install -g lambda-local jasmine
```

For Unit test, please set JASMINE_CONFIG_PATH= Specify a relative or absolute path to your configuration file.
```bash
export JASMINE_CONFIG_PATH=/Users/ylqin/workspace/serverless-aws-lambda-typescript-examples/jasmine.json
```

To run unit test:
```bash
npm run test
```

To run lambda function locally:
```bash
npm run test:local
```

To deploy use:
```bash
npm run deploy
```

To run post deployment test:
```bash
npm run test:function
```



