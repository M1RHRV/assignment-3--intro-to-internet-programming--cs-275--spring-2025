const {src, dest, series, watch} = require('gulp');
    htmlValidator = require('gulp-html');
    htmlCompressor = require('gulp-htmlmin');
    cssValidator = require(`gulp-stylelint`),
    cssCompressor = require(`gulp-clean-css`);
    jsLinter = require(`gulp-eslint`);
    jsCompressor = require(`gulp-uglify`);
    babel = require(`gulp-babel`);


    let ValidateHtml = ()=> {
        return src('index.html')
            .pipe(htmlValidator())
            .pipe(dest('dist'));
    }

    let CompressHtml = () => {
        return src('index.html')
            .pipe(htmlCompressor({
                collapseWhitespace: true,
            }))
            .pipe(dest('production'));
    }
