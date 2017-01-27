var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '/app'),
  entry: {
    app: './app.js',
    vendor: ['angular', 'angular-ui-router', 'angular-animate']
  },
  output: {
    path: path.resolve('./frontend/webpack_bundles/'),
    filename: "[name]-[hash].js",
    publicPath: 'http://localhost:8000/frontend/webpack_bundles/',
    sourceMapFilename: '[file].map'
  },
  plugins: [
    new BundleTracker({filename: './frontend/webpack-stats.json'}),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8000/',
      cors: true,
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }),
    new CopyWebpackPlugin([
      {from: './**/*.html'}
    ], {
      copyUnmodified: false
    }),
    new webpack.ProvidePlugin({
      moment: "moment"
    }),
    new CleanWebpackPlugin(['webpack_bundles'], {
      root: __dirname,
      verbose: true,
      dry: false,
      exclude: ['shared.js']
    })
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"]},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015'},
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
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  }
};