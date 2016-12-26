/*jslint node: true */
'use strict';

module.exports = function (grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        /**
         * Runs a webserver on http://localhost:9000.
         * It will be accessible on the local network by people who know the IP.
         */
        connect: {
            main: {
                options: {
                    base: 'www',
                    hostname: '*',
                    port: 9000,
                    livereload: true
                }
            }
        },

        /**
         * Watch for changes to files and automatically reload the page.
         */
        watch: {
            main: {
                options: {
                    livereload: true,
                    livereloadOnError: false,
                    spawn: false
                },
                files: ['www/*.html', 'www/**/*.html', 'www/img/*', 'less/**/*.less', 'less/*.less'],
                tasks: ['less'] //all the tasks are run dynamically during the watch event handler
            }
        },

        // Copy web assets from bower_components to more convenient directories.
        copy: {
            main: {
                files: [
                    // Vendor scripts.
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/js/',
                        src: ['**/*.js'],
                        dest: 'www/js/'
                    },

                    // Stylesheets.
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        cwd: 'bower_components/',
                        src: ['bootstrap/dist/css/**'],
                        dest: 'www/css/'
                    },

                    // Fonts.
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        cwd: 'bower_components/',
                        src: ['bootstrap/dist/fonts/**'],
                        dest: 'www/fonts/'
                    }, {
                        expand: true,
                        cwd: 'bower_components/jquery/dist/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'www/js/'
                    }, {
                        expand: true,
                        cwd: 'node_modules/moment/min/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'www/js/'
                    }
                ]
            },
        },

        /**
         * Compile LESS to CSS.
         */
        less: {
            production: {
                options: {},
                files: {
                    'www/css/main.css': 'less/main.less'
                }
            }
        }
    });

    grunt.registerTask('serve', ['copy', 'connect:main', 'watch']);
};
