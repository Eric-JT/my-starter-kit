const GULP         = require("gulp");
const BABEL        = require("gulp-babel");
const ESLINT       = require("gulp-eslint");
const PUG          = require("gulp-pug");
const SASS         = require("gulp-sass");
const PREFIX       = require("gulp-autoprefixer");
const BROWSER_SYNC = require("browser-sync");

/*
* Run ESLINT on your ecma2015 code
*/
GULP.task("eslint", function() {
  GULP.src("2-assets/js/*.js")
  .pipe(ESLINT())
  .pipe(ESLINT.format());
});

/*
*  Build you pug files
*/
GULP.task("pug", function() {
  return GULP.src("index.pug")
  .pipe(PUG())
  .pipe(GULP.dest("_site/"))
  .pipe(BROWSER_SYNC.reload({stream:true}));
});

/*
* Babel - compile your ecma2015 JavaScript
*/
GULP.task("babel", function() {
  // Browser source
  return GULP.src("2-assets/js/main.js")
  .pipe(BABEL())
  .pipe(GULP.dest("_site/assets/js"))
  .pipe(BROWSER_SYNC.reload({stream:true}));
});

/**
 * Compile scss files
 */
GULP.task("sass", function () {
  return GULP.src("2-assets/css/main.scss")
  .pipe(SASS({
    includePaths: ["css"],
    onError: BROWSER_SYNC.notify
  }))
  .pipe(PREFIX(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true }))
  .pipe(GULP.dest("_site/assets/css"))
  .pipe(BROWSER_SYNC.reload({stream:true}));
});

/*
* Run browser-sync
*/
GULP.task("browser-sync",["sass", "eslint", "babel", "pug"], function() {
  BROWSER_SYNC({
    server: {
      baseDir: "_site"
    },
    notify: false
  });
});

/*
*  Copy img folder into _site
*/
GULP.task("cp-img", function() {
  return GULP.src("2-assets/img/**")
  .pipe(GULP.dest("_site/assets/img"));
});

/*
* Watch folders for changes
*/
GULP.task("watch", function() {
  GULP.watch("2-assets/js/**", ["eslint", "babel"]);
  GULP.watch("2-assets/css/**", ["sass"]);
  GULP.watch("index.pug", ["pug"]);
  GULP.watch("1-includes/**", ["pug"]);
});

GULP.task("default", ["browser-sync", "watch", "cp-img"]);
