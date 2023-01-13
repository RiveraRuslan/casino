const project_folder = "dist"; //Папка для выгрузки информации
const source_folder = "#src"; //Папка с иходниками

const path = { //Пути ко всем файлам
  build: { //Gulp Будет выгружать файлы в Build пути
    html: project_folder  + '/',
    css: project_folder   + '/css/',
    js: project_folder    + '/js/',
    img: project_folder   + '/img/',
    fonts: project_folder + '/fonts/',
  },
  src: { //Пути к файлам
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: source_folder   + '/scss/style.scss',
    js: source_folder    + '/js/**/*.js',
    img: source_folder   + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    fonts: source_folder + '/fonts/*.ttf',
    // slickCSS: 'node_modules/slick-carousel/slick/slick.css',
    // slickJS:  '/node_modules/slick-carousel/slick/slick.js',
  },
  watch: { //Gulp Слушатель
    html: source_folder + '/**/*.html',
    css: source_folder  + '/scss/**/*.scss',
    js: source_folder   + '/js/**/*.js',
    img: source_folder  + '/img/**/*.{jpg,png,svg,gif,ico,webp}'
  },
  clean: './' + project_folder + '/'
}

const {
  src,
  dest
} = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileinclude = require('gulp-file-include'),
  del = require('del'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  group_media = require('gulp-group-css-media-queries'),
  cleanCSS = require('gulp-clean-css'),
  gulp_rename = require('gulp-rename'),
  glify = require('gulp-uglify-es').default,
  imagemin = require('gulp-imagemin'),
  svgmin = require('gulp-svgo'),
  webp = require('gulp-webp'),
  //webphtml = require('gulp-webp-html'),
  webpcss = require("gulp-webp-css");
  ///htmlmin = require('gulp-htmlmin');

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/"
    },
    port: 3000,
    notify: false
  })
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    //.pipe(webphtml())
    .pipe(dest(path.build.html)) //Куда полетят файла
    // .pipe(gulp_rename({
    //   extname: '.min.html'
    // }))
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(path.build.html)) //Куда полетят файла
    .pipe(browsersync.stream())
}

function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: 'expanded'
      })
    )
    .pipe(
      group_media()
    )
    .pipe(
      autoprefixer({
        grid:true,
        overrideBrowserslist: ['last 10 versions'],
        cascade: true
      })
    )
    // .pipe(webpcss())
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
    .pipe(cleanCSS({ level: {1: {specialComments: 0} }/*,format: 'beautify' */})) //Если нужен другой формат сжатия
    .pipe(gulp_rename({
      extname: '.min.css'
    }))
   .pipe(dest(path.build.css))
   .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js)) //Куда полетят файла
    .pipe(glify())
    .pipe(gulp_rename({
      extname: '.min.js'
    }))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images() {
  return src(path.src.img)
    .pipe(
      webp({
        qulity: 70
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        interlaced: true,
        optimizationLevel: 5, //0 to 7
      })
    )
    .pipe(svgmin())
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

//Следим за обновлениями
function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);

  gulp.watch([path.watch.img], images);
}

function clean(){
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images));
const watch = gulp.parallel(build, watchFiles, browserSync); //Следи за браузером

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;