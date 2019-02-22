var ns = "wsu";
module.exports = {  // note that this is temp, we would not hard code this
    maps: {
        files: [
            { expand: true, src: ["./.build/_pre_sass/"+ns+"-typography.css.map"], dest: "./dist/css/", flatten: true, },
            { expand: true, src: ["./.build/_pre_sass/"+ns+"-ui.css.map"], dest: "./dist/css/", flatten: true, },
            { expand: true, src: ["./src/scss/typography/fontawesome/fonts/"], dest: "./dist/css/fonts/", flatten: true, },
            { expand: true, src: ["./.build/_pre_sass/"+ns+"-ie9-.support.css.map"], dest: "./dist/css/", flatten: true, },
            { expand: true, src: ["./.build/_pre_sass/"+ns+"-slim.css.map"], dest: "./css/", flatten: true, },
            { expand: true, src: ["./.build/_pre_sass/"+ns+"-custom.css.map"], dest: "./css/", flatten: true, },
            { expand: true, src: ["./.build/**/*.*"], dest: "./css/" },
            { expand: true, src: ["./.build/**/*.*"], dest: "./dist/css/" },
        ]
    },
    repo:{ // this is temp
        files:[
            {
                expand: true,
                cwd: 'dist',
                src: '**',
                dest: "Q:\\FAIS\\Resources\\wsu.global.ns\\<%= pkg.build_version %>\\"
            },
            {
                expand: true,
                cwd: 'dist',
                src: '**',
                dest: "Q:\\FAIS\\Resources\\wsu.global.ns\\<%= pkg.version %>\\"
            },
        ]
    }
};
