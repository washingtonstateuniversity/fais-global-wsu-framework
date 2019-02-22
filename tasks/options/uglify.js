module.exports = {
    options: {
        banner: "/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today('yyyy-mm-dd') %> */\n" +
            "/*   */\n",
        //sourceMap: true,
    },
    dist_pack: {
      files: {
        'dist/js/mainline.min.js': ['dist/js/mainline.js']
      }
    }
};
