const { src, dest, watch, parallel } = require("gulp");

//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

//img
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    src('src/scss/**/*.scss')
    .pipe( plumber())
    .pipe( sass() )
    .pipe( postcss([autoprefixer(), cssnano()]))
    .pipe(dest("build/css"))
    

    done(); //Callback
}

function imagenes( done ) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/*.{jpg, png}')
        .pipe( cache( imagemin(opciones)))
        .pipe (dest('build/img'))

    done();
}

function versionWebp( done ) {

    const opciones = {
        quality: 50
    };

    src('src/img/*.{jpg, png}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img'))

    done();
}

function versionAvif( done ) {

    const opciones = {
        quality: 50
    };

    src('src/img/*.{jpg, png}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img'))

    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css)

    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(css, imagenes, versionWebp, versionAvif, dev);