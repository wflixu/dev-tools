module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      foo: {
        src: ['src/a.js', 'src/b.js'],
        dest: 'dist/abc.js'
      },
      bar: {
        src: ['src/a.js', 'src/b.js'],
        dest: 'dist/ab.js'
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "./src",
          include: [ "foo","bar"],
          out: "dist/main.all.js"
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ['assets/css']
        },
        files: {
          'dist/result.css': 'src/main.less'
        }
      }
    },
    uglify: {
      dynamic_mappings: {
        // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
        // runs and build the appropriate src-dest file mappings then, so you
        // don't need to update the Gruntfile when files are added or removed.
        files: [
          {
            expand: true, // Enable dynamic expansion.
            cwd: 'dist/', // Src matches are relative to this path.
            src: ['*.js'], // Actual pattern(s) to match.
            dest: 'dist/', // Destination path prefix.
            ext: '.min.js', // Dest filepaths will have this extension.
            extDot: 'first' // Extensions in filenames begin after the first dot
          }
        ]
      }
    },
    clean: {
      foo: {
        src: ['dist/**']
        // filter: 'isFile',
      }
    },
    jshint: {
      files: ['src/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });
  // 代码检查
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //清空文件
  grunt.loadNpmTasks('grunt-contrib-clean');
  // 合并文件
  grunt.loadNpmTasks('grunt-contrib-concat');
  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 持续的监听文件变化
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.loadNpmTasks('grunt-contrib-less');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify']);
  //requirejs 模块化
  grunt.registerTask('require', ['clean', 'requirejs']);

  grunt.registerTask('myless', ['clean', 'less']);
};
