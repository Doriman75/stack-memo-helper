module.exports = function(grunt) {
  grunt.initConfig({
    includereplace: {
      options: {
        prefix: "@"
      },
      index: {
        src: 'src/index.html',
        dest: 'dist/index.html'
      }
    },
    watch: {
      scripts: {
        files: ['**/*'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },
    copy: {
      main: {
        cwd: 'src',
        src: ['*.woff', 'manifest.json', 'sw.js', 'img/*.png'],
        dest: 'dist/',
        flatten: true,
        filter: 'isFile',
        expand: true
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-include-replace");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask("default", ["includereplace", "copy"])
}