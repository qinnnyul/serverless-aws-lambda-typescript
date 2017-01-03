Install node.js packages and install serverless:
```bash
npm i
npm install -g serverless
```

For unit test, lambda testing, please install the following package globally
```bash
npm install -g lambda-local jasmine
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



