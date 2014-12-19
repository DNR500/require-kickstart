module.exports = function(grunt) {

    var jsFiles = ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jsonlint: {
            project: {
                src: [ 'bower.json', 'package.json' ]
            }
        },

        jshint: {
            files: jsFiles
        },
        modernizr: {
            dist: {
                "devFile" : "bower_components/modernizr/modernizr.js",
                "outputFile" : "src/js/libs/modernizr/modernizr.min.js",
                "extra" : {
                    "shiv" : true,
                    "printshiv" : false,
                    "load" : true,
                    "mq" : false,
                    "cssclasses" : true
                },
                "extensibility" : {
                    "addtest" : false,
                    "prefixed" : false,
                    "teststyles" : false,
                    "testprops" : false,
                    "testallprops" : false,
                    "hasevents" : false,
                    "prefixes" : false,
                    "domprefixes" : false,
                    "cssclassprefix": ""
                },
                "uglify" : true,
                "tests" : [],
                "parseFiles" : true,
                "files" : {
                    "src": ['src/**/*.*']
                },
                "matchCommunityTests" : false,
                "customTests" : []
            }

        },
        uglify: {
            requirejs: {
                files: {
                    'src/js/libs/require/require.min.js': ['bower_components/requirejs/require.js']
                }
            }
        },
        copy: {
            bowerToSrc: {
                files: [
                    {expand: true, cwd: 'bower_components/jquery/dist/', src: 'jquery.min.js', dest: 'src/js/libs/jquery/', flatten: true, filter: 'isFile'}
                ]
            }
        },
        watch: {
            files: jsFiles,
            tasks: ['test']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks("grunt-modernizr");
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('jsLibs', ['copy:bowerToSrc', 'modernizr:dist:bust', 'uglify:requirejs']);
    grunt.registerTask('test', ['jsonlint', 'jshint']);
    grunt.registerTask('build', ['test']);
    grunt.registerTask('default', ['test']);

};