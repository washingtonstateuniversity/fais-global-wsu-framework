module.exports = {
    files: [
        //"./src/js/zeroclipboard/ZeroClipboard.js",
    ],
    options: {
        // options here to override JSHint defaults
        boss: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        expr: true,
        immed: true,
        noarg: true,
        //onevar: true,
        //quotmark: "double",
        smarttabs: true,
        //trailing: true,
        undef: true,
        unused: true,
        globals: {
            jQuery: true,
            $: true,
            console: true,
            module: true,
            document: true,
            window:true,
            define:true,
            alert:true,
            setTimeout:true,
            ZeroClipboard:true,
            MutationObserver:true,
            google:true,
            tinyMCE:true,
            tinymce:true,
            addthis:true,
        }
    }
};
