const path = require('path');
const projectRoot = path.resolve(__dirname, '../../');

module.exports = {
  clean: {
    include: [
      './dist'
    ],
    root: projectRoot
  },
  input: {
    baseDir: projectRoot,
    chunks: {
      zenith: './zenith/zenith.ts'
    }
  },
  output: {
    complete:  path.resolve(__dirname, `${projectRoot}/dist`),
    cacheDir:  path.resolve(__dirname, `${projectRoot}/.cache/[confighash]`),
    fileNameCallback: (chunkData) => {
      return '[name].js';
    }
  },
  loaders: {
    excludedPaths: /node_modules/,
    tsLoader: {
      configFile: 'build/config/tsconfig.json'
    }
  }
}
