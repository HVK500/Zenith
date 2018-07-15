// https://www.npmjs.com/package/gulp-parcel
// https://www.npmjs.com/package/parcel-plugin-pug
// https://www.npmjs.com/package/parcel-plugin-bundle-manifest
// https://github.com/albinotonnina/parcel-plugin-wrapper
// https://www.npmjs.com/package/parcel-plugin-bundle-visualiser
// https://www.npmjs.com/package/parcel-plugin-web-extension
// "parcel-plugin-typescript": "^1.0.0",

const gulp = require('gulp');
const typedoc = require('gulp-typedoc');
const del = require('del');
const path = require('path');
const Bundler = require('parcel-bundler');

const taskHelpers = require('./build/taskhelpers.js');
const taskOptions = require('./build/config/taskoptions.js');
const taskPaths = require('./build/config/taskpaths.js');

gulp.task('clean', () => {
  return del(taskPaths.del, taskOptions.del);
});

gulp.task('build', async () => {
  // const file = path.join(__dirname, taskPaths.parcal.input);
  // const bundler = new Bundler(file, taskOptions.parcel);

  // bundler.on('bundled', (bundle) => {
  //   // fs.writeFileSync('./poo.json', JSON.stringify(bundle.entryAsset, null, 2), 'utf8');
  //   // console.log(bundle.entryAsset);
  // });

  // return await bundler.bundle();
  return await new Bundler(path.join(__dirname, taskPaths.parcal.input), taskOptions.parcel).bundle()
    .then(taskHelpers.requireRemapping(taskOptions));
});

gulp.task('doc', () => {
  return gulp.src(taskPaths.tsDoc.input)
    .pipe(typedoc({
      name: taskOptions.tsDoc.name,
      out: taskPaths.tsDoc.output,
      theme: taskPaths.tsDoc.theme,
      mode: taskOptions.tsDoc.mode,
      //json: taskPaths.documentation.description,
      module: 'commonjs',
      target: 'es5',
      includeDeclarations: taskOptions.tsDoc.includeDeclarations,
      ignoreCompilerErrors: true,
      version: taskOptions.tsDoc.versionOfTsDoc
    }));
});
