const { src, dest, series, parallel, watch } = require("gulp");

const gulpSass = require("gulp-sass")(require("sass"));
const gulpAutoprefixer = require("gulp-autoprefixer");

const gulpConcat = require("gulp-concat");
const gulpUglify = require("gulp-uglify");

const gulpImagemin = require("gulp-imagemin");
const gulpSvgStore = require("gulp-svgstore");

const browserSync = require("browser-sync").create();

const gulpPlumber = require("gulp-plumber");
const gulpNotify = require("gulp-notify");

const del = require("del");
const gulpSvgstore = require("gulp-svgstore");

// gulpPlumber налаштування
const gulpPlumberConfig = {
  errorHandler: gulpNotify.onError({
    message: "Error <%= error.message %>",
    sound: false
  })
};

// ТАСКИ ДЛЯ РОЗРОБКИ
function server() {
  browserSync.init({
    server: {
      baseDir: "./app"
    },
    notify: false
  });
}

function styles() {
  return (
    src("./app/scss/styles.scss")
      .pipe(gulpPlumber(gulpPlumberConfig))
      .pipe(
        gulpSass({
          outputStyle: "compressed"
        })
      )
      // .pipe(
      //   gulpAutoprefixer({
      //     overrideBrowserslist: ["last 10 versions"]
      //   })
      // )
      .pipe(gulpConcat("styles.min.css"))
      .pipe(dest("./app/css"))
      .pipe(browserSync.stream())
  );
}

function scripts() {
  return src(["./node_modules/mixitup/dist/mixitup.js", "./app/js/main.js"])
    .pipe(gulpPlumber(gulpPlumberConfig))
    .pipe(gulpConcat("main.min.js"))
    .pipe(gulpUglify())
    .pipe(dest("./app/js"))
    .pipe(browserSync.stream());
}

function svgSprite() {
  return src("./app/images/icons/**/*.svg")
    .pipe(gulpSvgstore())
    .pipe(dest("./app/images"));
}

// ТАСКИ ДЛЯ ФІНАЛЬНОЇ ЗБІРКИ
function cleanDist() {
  return del("./dist");
}

function images() {
  return src(["./app/images/**/*", "!./app/images/icons"])
    .pipe(gulpPlumber(gulpPlumberConfig))
    .pipe(
      gulpImagemin([
        gulpImagemin.gifsicle({ interlaced: true }),
        gulpImagemin.mozjpeg({ quality: 75, progressive: true }),
        gulpImagemin.optipng({ optimizationLevel: 5 }),
        gulpImagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(dest("./dist/images"));
}

function building() {
  return src(
    ["./app/*.html", "./app/css/styles.min.css", "./app/js/main.min.js"],
    { base: "./app" }
  ).pipe(dest("./dist"));
}

function watching() {
  watch("./app/**/*.html").on("change", browserSync.reload);
  watch("./app/scss/**/*.scss", styles);
  watch(["./app/js/**/*.js", "!./app/js/main.min.js"], scripts);
}

exports.clean = cleanDist;
exports.svg = svgSprite;

exports.default = parallel(styles, scripts, server, watching);

exports.build = series(cleanDist, parallel(building, images));
