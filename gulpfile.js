const { series, task, src, dest } = require("gulp");
const minifyJS = require("webpack-stream");
const cleanCss = require("gulp-clean-css");
const htmlMin = require("gulp-htmlmin");
const { init, write } = require("gulp-sourcemaps");
const optimizeImage = require("gulp-image");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const inject = require("gulp-inject");
const cleanFiles = require("gulp-clean");

task("minify-js", () =>
  src("js/*.js")
    .pipe(minifyJS({
		mode: 'production',
	}))
    .pipe(
      rename({
        prefix: "budle-",
        suffix: ".min",
      })
    )
    .pipe(dest("dist/js/"))
);

task("minify-css", () =>
  src("css/*.css")
    .pipe(init())
    .pipe(cleanCss({ compatibility: "ie7" }))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(concat("budle.css"))
    .pipe(write("./"))
    .pipe(dest("dist/css/"))
);
const optimizeImages = () =>
  src(["./assets/brand/*", "./assets/photos/*", "./assets/svg/*"])
    .pipe(
      optimizeImage({
        pngquant: false,
        svgo: false,
      })
    )
    .pipe(dest("./dist/assets/"));

const svgOrganize = () =>
  src("./dist/assets/*.svg").pipe(dest("./dist/assets/svg/"));

const photoOrganize = () =>
  src("./dist/assets/*.jpeg").pipe(dest("./dist/assets/photos/"));

const brandOrganize = () =>
  src("./dist/assets/*.png").pipe(dest("./dist/assets/brand/"));

const cleanImages = () => 
  src([
    "./dist/assets/*.svg",
    "./dist/assets/*.png",
    "./dist/assets/*.jpeg",
  ]).pipe(cleanFiles());

task(
  "organize-paths-images",
  series(optimizeImages, svgOrganize, photoOrganize, brandOrganize, cleanImages)
);
task("build-html", () => {
  const js = src("./dist/js/*.js", {
    read: false,
  });
  const css = src("./dist/css/*.css", {
    read: false,
  });
  return src("*.html")
    .pipe(
      htmlMin({
        collapseWhitespace: true,
        sortAttributes: true,
        sortClassName: true,
      })
    )
    .pipe(
      inject(js, {
        starttag: "<!-- inject:template:js -->",
        endtag: "<!-- endinject:js -->",
      })
    )
    .pipe(
      inject(css, {
        starttag: "<!-- inject:template:css -->",
        endtag: "<!-- endinject:css -->",
      })
    )
    .pipe(dest("dist/"));
});

exports.build = series(
  "minify-css",
  "minify-js",
  "build-html",
  "organize-paths-images"
);
