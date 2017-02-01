var webpack = require('webpack');

module.exports = function(config) {
  config.set({
    basePath: '',
    webpack: {
      module: {
        loaders: [
          {test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015'},
          {test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"]},
          {test: /\.css$/, loader: "style!css"},
          {test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url?limit=8192'},
          {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
          {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
          {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
          {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
          {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
          {test: /\.svg$/, loader: "file"},
          {test: /\.html$/, loader: "ng-cache-loader"}
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    preprocessors: {
      'frontend/app/app.js': ['webpack'],
      'frontend/app/tests.entry.js': ['webpack']
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-animate/angular-animate.js',
      './node_modules/angular-ui-router/release/angular-ui-router.js',
      './node_modules/moment/moment.js',
      './node_modules/angular-mocks/angular-mocks.js',
      'frontend/app/app.js',
      'frontend/app/tests.entry.js'
    ],
    frameworks: ['jasmine'],
    port: 9876,
    browsers: [
      'Chrome'
    ],
    logLevel: config.LOG,
    plugins: [
      require('karma-coverage'),
      require('karma-spec-reporter'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require("karma-phantomjs-launcher"),
      require("karma-firefox-launcher"),
      require("karma-webpack"),
    ]
  })
};