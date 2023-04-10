const { src, dest, series, watch } = require(`gulp`);
const htmlCompressor = require(`gulp-htmlmin`);
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const sass = require(`gulp-sass`);
const htmlValidator = require(`gulp-html`);
const cssLinter = require(`gulp-stylelint`);
const jsLinter = require(`gulp-eslint`);
const jsCompressor = require(`gulp-uglify`);

let compileCSS = () => {
    return src(`sass/main.scss`)
        .pipe(sass({
            outputStyle: `expanded`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`css/`));
};


let compressHTML = () => {
    return src(`uncompressed-html/*.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`compressed-html/`));
};

let compressJS = () => {
    return src(`uncompressed-scripts/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`compressed-scripts`));
};

let lintCSS = () => {
    return src(`css/*.css`)
        .pipe(cssLinter({
            failAfterError: true,
            reporters: [
                {formatter: `verbose`, console: true}
            ]
        }));
};

let lintJS = () => {
    return src(`scripts/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 0, // A delay is sometimes helpful when reloading at the
        server: {       // end of a series of tasks.
            baseDir: [
                `./`,
                `html`,
                `css`,
                `js`
            ]
        }
    });

    watch(`html/**/*.html`).on(`change`, reload);
};

let validateHTML = () => {
    return src(`html-files/*.html`)
        .pipe(htmlValidator());
};

exports.validateHTML = validateHTML;
exports.serve = serve;
exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.compressHTML = compressHTML;
exports.compileCSS = compileCSS;
exports.default = series(lintCSS, lintJS, serve);
exports.build = series(compressHTML, compileCSS, compressJS)
