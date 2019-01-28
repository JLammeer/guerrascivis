// Utilities
const { src, dest } = require(`../utilities/api`);
const { pathTo } = require(`../utilities/paths`);

// Modules
const { browserSync } = require(`../modules/browserSync`);

// Plugins
const { sass, sourcemaps } = require(`../plugins/plugins.manifest`);

// Main task
// Sass project compiling configuration
sass.compiler = require(`node-sass`);

function compileSass() {
  const sassResult = src(pathTo.sassFiles)
                      .pipe(sourcemaps.init())
                      .pipe(sass().on(`error`, sass.logError))
                      .pipe(sourcemaps.write(`./`));

  return sassResult
          .pipe(dest(`./build/css`))
          .pipe(browserSync.stream());
}

module.exports = {
  compileSass
};