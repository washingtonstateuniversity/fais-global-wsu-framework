module.exports = function(grunt) {

    // Look at the passed path for .js files used as extended Grunt config.
    function loadConfig( path ) {
        var glob = require( "glob" );
        var object = {};
        var key;

        glob.sync( "*", { cwd: path } ).forEach( function( option ) {
            key = option.replace( /\.js$/, "" );
            object[ key ] = require( path + option );
        } );

        return object;
    }
    //grunt.loadTasks( './tasks/' );
    var pkg, config;
        pkg = grunt.file.readJSON( "package.json" );

    config = {
        pkg: grunt.file.readJSON("package.json"),
    };



    grunt.util._.extend( config, loadConfig( "./tasks/options/" ) );
    grunt.initConfig( config );

    require( "load-grunt-tasks" )( grunt );
    grunt.loadTasks( "tasks" );

    // Default task(s).
    grunt.registerTask("start", ["watch"]);
    grunt.registerTask("default", [ "stylelint", "sassport", "jshint", "autoprefixer", "cssmin",  "copy" ]); //"uglify" ,

};
