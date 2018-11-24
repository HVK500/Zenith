const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const buildPaths = require('./paths');
const buildOptions = require('./options');

module.exports = {
  // cache: buildOptions.cache.enabled,
  mode: buildOptions.buildStage,
  context: buildPaths.input.baseDir,
  entry: buildPaths.input.chunks,
  output: {
    filename: buildPaths.output.fileNameCallback,
    path: buildPaths.output.complete
  },
  plugins: [
    // new webpack.ProgressPlugin(),
    // new HardSourceWebpackPlugin({
    //   cacheDirectory: buildPaths.output.cacheDir,
    //   cachePrune: buildOptions.cache.lifeTime
    // }),
    // new CleanWebpackPlugin(buildPaths.clean.include, {
    //     root: buildPaths.clean.root
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: buildPaths.loaders.excludedPaths,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: buildPaths.loaders.tsLoader.configFile
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  }
};
