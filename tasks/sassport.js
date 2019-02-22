/* global require, setTimeout */
module.exports = function(grunt) {
    grunt.registerTask("sassport", "Set up all test pages", function() {
        var sass = require('node-sass');
        var done = this.async();
        //var fs = require("fs");
        var fs = require("fs-extra");
        fs.mkdirsSync("./.build/_pre_sass");
        /*
         * This will apply defaults and build the nav
         */
        function render_sass( from, to , data){

            if( "undefined" !== typeof data ){
                //console.log(data);
                //console.log(from);
                fs.readFile( from, function (err, content) {
                    if (err){
                        console.log("failed to find" + from);
                        throw err;
                    }
                    //console.log(content);
                    var _data = data + " " + content;
                    var result = sass.renderSync({
                        data: _data, //
                        includePaths:["./src/scss"],
                        outputStyle: 'compact',
                        outFile: to,
                        //sourceMap: true, // or an absolute or relative (to outFile) path
                        /*importer: function(url, prev, done) {
                            // url is the path in import as is, which LibSass encountered.
                            // prev is the previously resolved path.
                            // done is an optional callback, either consume it or return value synchronously.
                            // this.options contains this options hash
                            someAsyncFunction(url, prev, function(result){
                                done({
                                    file: result.path, // only one of them is required, see section Sepcial Behaviours.
                                    contents: result.data
                                });
                            });
                            // OR
                            var result = someSyncFunction(url, prev);
                            return {file: result.path, contents: result.data};
                        }*/
                    });
                    fs.writeFile( to, result.css, function(err){
                        if(!err){
                            //file written on disk
                        }
                    });
                });
            }else{
                var result = sass.renderSync({
                    file: from,
                    outputStyle: 'compact',
                    outFile: to,
                    //sourceMap: true, // or an absolute or relative (to outFile) path
                    /*importer: function(url, prev, done) {
                        // url is the path in import as is, which LibSass encountered.
                        // prev is the previously resolved path.
                        // done is an optional callback, either consume it or return value synchronously.
                        // this.options contains this options hash
                        someAsyncFunction(url, prev, function(result){
                            done({
                                file: result.path, // only one of them is required, see section Sepcial Behaviours.
                                contents: result.data
                            });
                        });
                        // OR
                        var result = someSyncFunction(url, prev);
                        return {file: result.path, contents: result.data};
                    }*/
                });
                fs.writeFile( to, result.css, function(err){
                    if(!err){
                    //file written on disk
                    }
                });
            }

        }

        function compare(a,b) {
            if (a< b)
                return -1;
            if (a > b)
                return 1;
            return 0;
        }


          // note that this is temp, we would not hard code this
        var custom = "480 667 996";

        var ns = "wsu";

        //render_sass( "./src/scss/"+ns+"-typography.scss", "./.build/_pre_sass/"+ns+"-typography.css" , '$globalVmsize: null;'  );
        //render_sass( "./src/scss/"+ns+"-ui.scss", "./.build/_pre_sass/"+ns+"-ui.css" , '$globalVmsize: ' + custom + ";" );
        //render_sass( "./src/scss/"+ns+"-ie9-.support.scss", "./.build/_pre_sass/"+ns+"-ie9-.support.css" , '$globalVmsize: ' + custom + ";" );

        //render_sass( "./src/scss/"+ns+"-slim.scss", "./.build/_pre_sass/"+ns+"-slim.css" , '$globalVmsize: false;'  );
        //render_sass( "./src/scss/"+ns+"-custom.scss", "./.build/_pre_sass/"+ns+"-custom.css", '$globalVmsize: ' + custom + ";" );


        setTimeout( function() {
            grunt.log.writeln( "All done! " );
            done();
        }, 1 );
    });
};
