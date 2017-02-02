let ns = "wsu";
module.exports = {  // note that this is temp, we would not hard code this
    maps: {
        files: [
            { expand: true, src: ["./.build/_pre_sass/"+ns+"-typography.css.map"], dest: "./dist/extra/", flatten: true, },
            { expand: true, src: ["./.build/_pre_sass/"+ns+"-ui.css.map"], dest: "./dist/extra/", flatten: true, },
            { expand: true, src: ["./src/scss/typography/fontawesome/fonts/"], dest: "./dist/extra/fonts/", flatten: true, },
            { expand: true, src: ["./.build/_pre_sass/"+ns+"-ie9-.support.css.map"], dest: "./dist/extra/", flatten: true, },
            { expand: true, src: ["./.build/_pre_sass/"+ns+"-slim.css.map"], dest: "./dist/", flatten: true, },
            { expand: true, src: ["./.build/_pre_sass/"+ns+"-custom.css.map"], dest: "./dist/", flatten: true, },
            { expand: true, src: ["./.build/**/*.*"], dest: "./dist/" },
            { expand: true, src: ["./.build/**/*.*"], dest: "./dist/extra/" },
        ]
    }
};
