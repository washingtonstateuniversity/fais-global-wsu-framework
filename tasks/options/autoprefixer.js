let ns = "wsu";
module.exports = {  // note that this is temp, we would not hard code this
    options: {
        browsers: [ "last 2 versions","ie 9","ie 10"], //"> 1%",
        remove:false//
    },
    wsu_typography: {
        src: "./.build/_pre_sass/"+ns+"-typography.css",
        dest: "./.build/_precss/"+ns+"-typography.css"
    },
    wsu_ie: {
        src: "./.build/_pre_sass/"+ns+"-ie9-.support.css",
        dest: "./.build/_precss/"+ns+"-ie9-.support.css"
    },
    wsu_ui: {
        src: "./.build/_pre_sass/"+ns+"-ui.css",
        dest: "./.build/_precss/"+ns+"-ui.css"
    },
    wsu_slim: {
        src: "./.build/_pre_sass/"+ns+"-slim.css",
        dest: "./.build/_precss/"+ns+"-slim.css"
    },
    wsu_custom: {
        src: "./.build/_pre_sass/"+ns+"-custom.css",
        dest: "./.build/_precss/"+ns+"-custom.css"
    }
}
