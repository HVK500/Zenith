const path = require('path');
const libVersion = require('../../package.json').version;
const projectRoot = path.resolve(__dirname, '../../');

module.exports = {
  input: {
    baseDir: projectRoot,
    chunks: {
      zenith: './zenith/zenith.ts'
    }
  },
  output: {
    complete:  path.resolve(__dirname, `${projectRoot}/dist`),
    fileNameCallback: (chunkData) => {
      return `[name].${libVersion}.js`;
    }
  },
  loaders: {
    excludedPaths: /node_modules/,
    tsLoader: {
      configFile: 'build/config/tsconfig.json'
    }
  }
}
