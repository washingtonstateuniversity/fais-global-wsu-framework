module.exports = {
    files: [
        "src/**/*",
    ],
    tasks: [  "ts:default", "uglify:dist_pack", "stylelint", "sassport", "jshint", "autoprefixer", "cssmin", "copy" ] //"uglify" ,
};
