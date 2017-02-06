module.exports = {
    files: [
        "src/**/*",
    ],
    tasks: [  "ts:default", "stylelint", "sassport", "jshint", "autoprefixer", "cssmin",   "copy" ] //"uglify" ,
};
