var ns = "wsu"; // skiping later @todo remove
module.exports = {  // note that this is temp, we would not hard code this
options: {
    sourceMap: true,
        //style: 'expanded',
        //banner: '<%= tag.banner %>',
        compass: true
    },
    wsu_typography: {
        files: [
            { src: "./src/scss/"+ns+"-typography.scss", dest: "./.build/_pre_sass/"+ns+"-typography.css" },
        ]
    },
    wsu_ui: {
        files: [
            { src: "./src/scss/"+ns+"-ui.scss", dest: "./.build/_pre_sass/"+ns+"-ui.css" },
        ]
    },
    wsu_ie: {
        files: [
            { src: "./src/scss/"+ns+"-ie9-.support.scss", dest: "./.build/_pre_sass/"+ns+"-ie9-.support.css" },
        ]
    },
    wsu_slim: {
        files: [
            { src: "./src/scss/"+ns+"-slim.scss", dest: "./.build/_pre_sass/"+ns+"-slim.css" },
        ]
    },
    wsu_custom: {
        files: [
            { src: "./src/scss/"+ns+"-custom.scss", dest: "./.build/_pre_sass/"+ns+"-custom.css" },
        ]
    }
};
