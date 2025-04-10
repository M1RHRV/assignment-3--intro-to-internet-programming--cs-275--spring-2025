const { src, dest, series, watch } = require(`gulp`);
const htmlValidator = require(`gulp-html`);
const htmlCompressor = require(`gulp-htmlmin`);
const cssValidator = require(`gulp-stylelint`);
const cssCompressor = require(`gulp-clean-css`);
const jsLinter = require(`gulp-eslint`);
const jsCompressor = require(`gulp-uglify`);
const babel = require(`gulp-babel`);
const browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let validateHTML = () => {
    return src(`index.html`)
        .pipe(htmlValidator())
        .pipe(dest(`dist`));
};

let compressHTML = () => {
    return src(`index.html`)
        .pipe(htmlCompressor({
            collapseWhitespace: true,
        }))
        .pipe(dest(`production`));
};
let validateJS = () => {
    return src(`scripts/main.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let validateCSS = () => {
    return src(`styles/*.css`)
        .pipe(cssValidator({
            failAfterError: false,
            reporters: [{
                formatter: `string`,
                console: true
            }]
        }));
};

let compressCSS = () => {
    return src(`styles/*.css`)
        .pipe(cssCompressor())
        .pipe(dest(`production/styles`));
};

let transpileJSForDev = () => {
    return src(`scripts/main.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
};

let transpileJSForProd = () => {
    return src(`scripts/main.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`production/scripts`));
};


let copyUnprocessedAssetsForProd = () => {
    return src([
        `temp/*.*`,
        `temp/**`,
        `!temp/html/`,
        `!temp/html/*.*`,
        `!temp/html/**`,
        `!temp/**/*.js`,
        `!temp/styles/**`
    ], {dot: true})
        .pipe(dest(`prodution`));
};

let serve = () => {
    browserSync({
        reloadDelay: 50,
        browser: `*`,
        server: {
            baseDir: [
                `.temp`,
                `./`,
            ]
        }
    });

    watch(`scripts/main.js`, series(validateJS, transpileJSForDev)).on(`change`, reload);

    watch(`styles/main.css`).on(`change`, reload);

    watch(`index.html`).on(`change`, reload);
};

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.validateCSS = validateCSS;
exports.compressCSS = compressCSS;
exports.validateJS = validateJS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.copyUnprocessedAssetsForProd = copyUnprocessedAssetsForProd;
exports.serve = series(
    validateJS,
    transpileJSForDev,
    serve
);
exports.build = series(
    compressHTML,
    compressCSS,
    transpileJSForProd,
    copyUnprocessedAssetsForProd
);
