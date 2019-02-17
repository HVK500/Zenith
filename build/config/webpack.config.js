const path = require('path');
const DtsBundlePlugin = require('webpack-dts-bundle');

const buildPaths = require('./paths');
const buildOptions = require('./options');

module.exports = {
  mode: buildOptions.buildStage,
  context: buildPaths.input.baseDir,
  entry: buildPaths.input.chunks,
  output: {
    filename: buildPaths.output.fileNameCallback,
    path: buildPaths.output.complete
  },
  plugins: [
    new DtsBundlePlugin.default({
      name: 'zenith',
      main: path.resolve(__dirname, '../../dist/zenith/index.d.ts'),
      out: path.resolve(__dirname, '../../dist/zenith/index.d.ts')
    })
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
