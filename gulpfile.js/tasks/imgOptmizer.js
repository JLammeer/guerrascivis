// Utilities
const { src, dest } = require('../utilities/api');
const { options } = require('../utilities/options');
const { globFor } = require('../utilities/paths');

// Plugins
const { cache } = require('../plugins/plugins.manifest');
const { imagemin, imageminPngquant } = require('../plugins/imagemin');

// Main task
function optimizeImg() {
  const imageminPlugins = [
    imagemin.gifsicle(options.imageminPlugins.gifsicle),
    imagemin.jpegtran(options.imageminPlugins.jpegtran),
    imagemin.optipng(options.imageminPlugins.optipng),
    imagemin.svgo(options.imageminPlugins.svgo),
    imageminPngquant()
  ]

  return src(`build/${globFor.images}`)
          .pipe(cache(imagemin(imageminPlugins, options.imagemin)))
          .pipe(dest('dist/'));
}

module.exports = {
  optimizeImg
};