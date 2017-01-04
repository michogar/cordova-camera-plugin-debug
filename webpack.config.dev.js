var path = require('path');
var entryPath = path.join(__dirname, 'src'),
  outputPath = path.join(__dirname, 'dist');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    path.join(entryPath, 'index.js')
  ],
  output: {
    path: outputPath,
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      { test: /\.js?$/, loader: 'eslint-loader', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.js$/, include: entryPath, loaders: ['babel'] }
    ]
  },
  devServer: {
    contentBase: outputPath
  }
};

