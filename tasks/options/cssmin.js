let ns = "wsu";
let sets = {  // note that this is temp, we would not hard code this
    wsu_typography:{},
    wsu_ie:{},
    wsu_ui:{},
    wsu_slim:{},
    wsu_custom:{},
};

sets.wsu_typography["./dist/extra/"+ns+"-typography.css"]=["./.build/_precss/"+ns+"-typography.css"];
sets.wsu_ie["./dist/extra/"+ns+"-ie9-.support.css"]=["./.build/_precss/"+ns+"-ie9-.support.css"];
sets.wsu_ui["./dist/extra/"+ns+"-ui.css"]=["./.build/_precss/"+ns+"-ui.css"];
sets.wsu_slim["../dist/"+ns+"-slim.css"]=["./.build/_precss/"+ns+"-slim.css"];
sets.wsu_custom["./dist/"+ns+"-custom.css"]=["./.build/_precss/"+ns+"-custom.css"];

module.exports = {
    options: {
        sourceMap: true,
    },
    wsu_typography: {
        files: grunt.util._.extend( {}, sets.wsu_typography)
    },
    wsu_ie: {
        files: grunt.util._.extend( {}, sets.wsu_ie)
    },
    wsu_ui: {
        files: grunt.util._.extend( {}, sets.wsu_ui)
    },
    wsu_slim: {
        files: grunt.util._.extend( {}, sets.wsu_slim)
    },
    wsu_custom: {
        files: grunt.util._.extend( {}, sets.wsu_custom)
    }
};
