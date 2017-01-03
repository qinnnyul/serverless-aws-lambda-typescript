var path = require('path');

// Helper functions
module.exports = {
    entry: './src/main/handler.ts',
    target: 'node',
    externals: ["aws-sdk"], // modules to be excluded from bundled file
    resolve: {
        extensions: ['', '.ts', '.js', '.json'],

        // // Make sure root is src
        root: [ path.resolve('./src/main')]
    },
    output: {
        libraryTarget: 'commonjs',
        path: __dirname + "/dist",
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.json/,
                loader: 'json-loader'
            }
        ]
    }
};