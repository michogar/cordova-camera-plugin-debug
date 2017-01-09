var path = require('path');
var entryPath = path.join(__dirname, 'src'),
  outputPath = path.join(__dirname, 'dist');
var webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: [
    path.join(entryPath, 'index.js')
  ],
  output: {
    path: outputPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: entryPath,
        loaders: ['babel']
      }
    ]
  }
};

