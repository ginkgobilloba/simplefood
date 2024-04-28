const { src, dest, series, parallel, watch } = require("gulp");

const fileInclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");

const gulpSass = require("gulp-sass")(require("sass"));
const gulpSourcemaps = require("gulp-sourcemaps");
const gulpAutoprefixer = require("gulp-autoprefixer");

const gulpConcat = require("gulp-concat");
const gulpUglify = require("gulp-uglify");

const imagemin = require("gulp-imagemin");
const gulpSvgSprite = require("gulp-svg-sprite");

const browserSync = require("browser-sync").create();

const del = require("del");

const gulpPlumber = require("gulp-plumber");
const gulpNotify = require("gulp-notify");

// gulpPlumber config
const gulpPlumberConfig = {
  errorHandler: gulpNotify.onError({
    message: "Error <%= error.message %>",
    sound: false
  })
};

// TASKS FOR DEV

function server() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    notify: false
  });
}

function cleanDist() {
  return del("./dist");
}

function html() {
  return src("./app/html/*.html")
    .pipe(gulpPlumber(gulpPlumberConfig))
    .pipe(fileInclude({ prefix: "@@", basepath: "@file" }))
    .pipe(dest("./dist"));
}

function styles() {
  return src("./app/scss/main.scss")
    .pipe(gulpPlumber(gulpPlumberConfig))
    .pipe(gulpSourcemaps.init())
    .pipe(
      gulpSass({
        outputStyle: "expanded"
      })
    )
    .pipe(gulpConcat("main.min.css"))
    .pipe(gulpSourcemaps.write())
    .pipe(dest("./dist/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src([
    "./node_modules/mixitup/dist/mixitup.js",
    "./node_modules/swiper/swiper-bundle.js",
    "./app/js/main.js"
  ])
    .pipe(gulpPlumber(gulpPlumberConfig))
    .pipe(gulpConcat("main.min.js"))
    .pipe(dest("./dist/js"))
    .pipe(browserSync.stream());
}

function images() {
  return src(["./app/images/**/*", "!./app/images/icons/**/*"]).pipe(
    dest("./dist/images")
  );
}

function svgSprite() {
  return src("./app/images/icons/**/*.svg")
    .pipe(
      gulpSvgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg"
          }
        }
      })
    )
    .pipe(dest("app/images"));
}

function fonts() {
  return src("./app/fonts/**/*").pipe(dest("./dist/fonts"));
}

function watching() {
  watch("./app/html/**/*.html", html).on("change", browserSync.reload);
  watch("./app/scss/**/*.scss", styles);
  watch("./app/js/**/*.js", scripts);
  watch(["./app/images/**/*", "!./app/images/icons"], images).on(
    "add",
    browserSync.reload
  );
  watch("./app/fonts/**/*", fonts).on("add", browserSync.reload);
}

// TASKS FOR BUILD

// function serverDocs() {
//   browserSync.init({
//     server: {
//       baseDir: "./docs"
//     },
//     notify: false
//   });
// }

function cleanDocs() {
  return del("./docs");
}

function htmlDocs() {
  return src("./app/html/*.html")
    .pipe(gulpPlumber(gulpPlumberConfig))
    .pipe(fileInclude({ prefix: "@@", basepath: "@file" }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./docs"));
}

function stylesDocs() {
  return src("./app/scss/main.scss")
    .pipe(gulpPlumber(gulpPlumberConfig))
    .pipe(gulpSass({ outputStyle: "compressed" }))
    .pipe(gulpAutoprefixer({ overrideBrowserslist: ["last 10 versions"] }))
    .pipe(gulpConcat("main.min.css"))
    .pipe(dest("./docs/css"));
}

function scriptsDocs() {
  return src(["./node_modules/mixitup/dist/mixitup.js", "./app/js/main.js"])
    .pipe(gulpPlumber(gulpPlumberConfig))
    .pipe(gulpConcat("main.min.js"))
    .pipe(gulpUglify())
    .pipe(dest("./docs/js"));
}

function imagesDocs() {
  return src(["./app/images/**/*", "!./app/images/icons/**/*"])
    .pipe(gulpPlumber(gulpPlumberConfig))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(dest("./docs/images"));
}

function fontsDocs() {
  return src("./app/fonts/**/*").pipe(dest("./docs/fonts"));
}

exports.cleandist = cleanDist;
exports.cleandocs = cleanDocs;
exports.svg = svgSprite;

exports.default = series(
  cleanDist,
  parallel(html, styles, scripts, images, fonts),
  parallel(server, watching)
);

exports.docs = series(
  cleanDocs,
  parallel(htmlDocs, stylesDocs, scriptsDocs, imagesDocs, fontsDocs)
);
