const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const fileinclude = require("gulp-file-include");
const replaceB = require("gulp-batch-replace");
const replace = require("gulp-replace");
const fs = require("fs");

gulp.task("message", function () {
  return console.log("Gulp is running...");
});

gulp.task("sass", function () {
  return gulp
    .src("./src/styles/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("src/layout/include"));
});

gulp.task("test", function () {
  var strData = fs.readFileSync("src/data/data.json", "utf8");
  // console.log(strData);
  eval("var data=" + strData);

  var arrdata = [];

  var data = data[0];

  for (let i in data) {
    arrdata.push(["${" + i + "}", data[i]]);
  }

  gulp
    .src(["src/layout/index.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(replaceB(arrdata))
    .pipe(gulp.dest("./src/test"));
});

gulp.task("layout", function () {
  const cssContent = fs.readFileSync("src/layout/include/style.css", "utf8");
  const htmlContent = fs.readFileSync(
    "src/layout/include/content.html",
    "utf8"
  );
  const jsContent = fs.readFileSync("src/layout/include/main.js", "utf8");
  return gulp
    .src(["src/scripts/temp-js/renderGallery.js"])
    .pipe(replace("%%css%%", cssContent))
    .pipe(replace("%%html%%", htmlContent))
    .pipe(replace("%%js%%", jsContent))
    .pipe(gulp.dest("src/"));
});

gulp.task("default", gulp.series("sass", "layout"));
