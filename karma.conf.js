
module.exports = function(config) {
    config.set({

        basePath: '.',

        frameworks: ['jasmine'],

        files: [
            // paths loaded by Karma

            // paths to support debugging with source maps in dev tools
            {pattern: 'src/test/*.ts', included: true, watched: false},
        ],

        browsers: ['PhantomJS'],

        plugins : [
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ],

        logLevel: config.LOG_INFO,

        colors: true,

        autoWatch: false,

        singleRun: true
    })
};
