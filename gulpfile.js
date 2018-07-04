// https://www.npmjs.com/package/gulp-parcel
// https://www.npmjs.com/package/parcel-plugin-pug
// https://www.npmjs.com/package/parcel-plugin-bundle-manifest
// https://github.com/albinotonnina/parcel-plugin-wrapper
// https://www.npmjs.com/package/parcel-plugin-bundle-visualiser
// https://www.npmjs.com/package/parcel-plugin-web-extension

const gulp = require('gulp');
const banr = require('banr');
const del = require('del');
const path = require('path');
const fs = require('fs');
const Bundler = require('parcel-bundler');

const taskOptions = require('./build/taskoptions.js');
const taskPaths = require('./build/taskpaths.js');

gulp.task('clean', () => {
  return del(taskPaths.del, taskOptions.del);
});

gulp.task('default', async () => {
  let bundleOutputPath;
  const headerContent = banr();
  const file = path.join(__dirname, taskPaths.parcal.in);
  const bundler = new Bundler(file, taskOptions.parcel);

  bundler.on('bundled', (bundle) => {
    bundleOutputPath = bundle.name;
  });

  return await bundler.bundle().then(() => {
    const jsContent = fs.readFileSync(bundleOutputPath, 'utf-8');
    fs.writeFileSync(bundleOutputPath, headerContent + jsContent);
  });
});
