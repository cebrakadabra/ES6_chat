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
      src: ['test/unit/*.js']
    },
    env: {
      coverage: {
        APP_DIR_FOR_CODE_COVERAGE: '../test/coverage/instrument/app/'
      }
    },
    instrument: {
      files: 'app/*.js',
      options: {
        lazy: true,
        basePath: 'test/coverage/instrument/'
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['test/unit/*.js']
    },
    storeCoverage: {
      options: {
        dir: 'test/coverage/reports'
      }
    },
    makeReport: {
      src: 'test/coverage/reports/**/*.json',
      options: {
        type: 'lcov',
        dir: 'test/coverage/reports',
        print: 'detail'
      }
    }
});


grunt.loadNpmTasks('grunt-docco');
grunt.loadNpmTasks('grunt-mocha-test');
grunt.loadNpmTasks('grunt-istanbul');
grunt.loadNpmTasks('grunt-env');

// register Grunt tasks
grunt.registerTask('default', ['browserify', 'babel', 'sass', 'cssmin', 'copy', 'jshint', 'docco']);
grunt.registerTask('dev', ['browserify', 'babel', 'sass', 'cssmin', 'copy', 'jshint', 'watch']);
grunt.registerTask('prod', ['browserify', 'babel', 'sass', 'cssmin', 'copy', 'jshint', 'docco']);
grunt.registerTask('doc', ['docco']);
grunt.registerTask('test', ['mochaTest']);
grunt.registerTask('coverage', ['env:coverage', 'instrument', 'mochaTest', 'storeCoverage', 'makeReport']);

};
