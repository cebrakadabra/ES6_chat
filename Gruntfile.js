module.exports = function(grunt) {

// Load Grunt tasks declared in the package.json file
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

grunt.initConfig({
    babel: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'dist/public/js/transcriptedbuild.js': 'dist/public/js/build.js'
            }
        }
    },
    browserify: {
      js: {
        options: {
          transform: [["babelify", { "stage": 0 }]]
        },
        // A single entry point for our app
        src: [
          'app/js/app.js',
          'app/js/controller/*.js',
          'app/js/services/*.js',
          'app/js/directives/*.js'
        ],
        // Compile to a single file to add a script tag for in your HTML
        dest: 'dist/public/js/build.js',
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/public/css/build.min.css': ['app/css/*.css']
        }
      }
    },
    sass: {
      dist: {
        // files: {
        //   'dist/public/css/build.css': ['app/css/*.scss']
        // }
        files: [{
          expand: true,
          cwd: 'app/scss',
          src: ['*.scss'],
          dest: 'app/css',
          ext: '.css'
        }]
      }
    },
    copy: {
      html: {
        // This copies all the html and css into the dist/ folder
        expand: true,
        cwd: 'app/',
        src: ['**/*.html'],
        dest: 'dist/',
      },
      images: {
        expand: true,
        cwd: 'app/',
        src: ['images/*'],
        dest: 'dist/',
      },
      fonts: {
        expand: true,
        cwd: 'app/',
        src: ['fonts/*'],
        dest: 'dist/',
      }
    },
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'app/js/**/*.js', 'app/js/app.js'],
      options: {
          // more options here if you want to override JSHint defaults
        esnext: true,
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    docco: {
      nodejs: {
        src: [
          'app.js'
        ],
        options: {
          output: 'docs/'
        }
      },
      api: {
        src: [
          'api/**/*.js'
        ],
        options: {
          output: 'docs/api/'
        }
      },
      app: {
        src: [
          'app/js/**/*.js'
        ],
        options: {
          output: 'docs/app'
        }
      }
    },
    watch: {
      html: {
        files: ['app/index.html','app/partials/*.html'],
        tasks: ['copy', 'docco'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['app/scss/*.scss'],
        tasks: ['sass', 'cssmin', 'docco'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'browserify', 'babel', 'docco']
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['test/*.js']
    },

    mocha_istanbul: {
      coverage: {
          src: 'test', // a folder works nicely
          options: {
              mask: '*.js'
          }
      },
      coverageSpecial: {
          src: ['testSpecial/*/*.js', 'testUnique/*/*.js'], // specifying file patterns works as well
          options: {
              coverageFolder: 'coverageSpecial',
              mask: '*.spec.js',
              mochaOptions: ['--harmony','--async-only'], // any extra options
              istanbulOptions: ['--harmony','--handle-sigint']
          }
      },
      coveralls: {
          src: ['test', 'testSpecial', 'testUnique'], // multiple folders also works
          options: {
              coverage:true, // this will make the grunt.event.on('coverage') event listener to be triggered
              check: {
                  lines: 75,
                  statements: 75
              },
              root: './lib', // define where the cover task should consider the root of libraries that are covered by tests
              reportFormats: ['cobertura','lcovonly']
          }
        }
      },
      istanbul_check_coverage: {
        default: {
          options: {
            coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results
            check: {
              lines: 80,
              statements: 80
            }
          }
        }
      }

});


grunt.event.on('coverage', function(lcovFileContents, done){
    // Check below on the section "The coverage event"
    done();
});



// register Grunt tasks
grunt.registerTask('default', ['browserify', 'babel', 'sass', 'cssmin', 'copy', 'jshint', 'docco']);
grunt.registerTask('dev', ['browserify', 'babel', 'sass', 'cssmin', 'copy', 'jshint', 'watch']);
grunt.registerTask('prod', ['browserify', 'babel', 'sass', 'cssmin', 'copy', 'jshint', 'docco']);
grunt.registerTask('doc', ['docco']);
grunt.registerTask('test', ['mochaTest']);

grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);
grunt.registerTask('coverage', ['mocha_istanbul:coverage']);

};
