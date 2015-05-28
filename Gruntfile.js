// Load Grunt tasks declared in the package.json file
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

grunt.initConfig({
    babel: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'dist/app.js': 'src/app.js'
            }
        }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/build.css': ['app/css/*.css']
        }
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
      },
    },
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'app/js/**/*.js', 'app/js/app.js'],
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    watch: {
      html: {
        files: ['app/index.html','app/partials/*.html'],
        tasks: ['copy'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['app/css/*.css'],
        tasks: ['cssmin'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      }
});

// register Grunt tasks
grunt.registerTask('default', ['babel', 'cssmin', 'copy', 'jshint']);
grunt.registerTask('dev', ['babel', 'cssmin', 'copy', 'jshint', 'watch']);
 grunt.registerTask('prod', ['babel', 'cssmin', 'copy', 'jshint']);
