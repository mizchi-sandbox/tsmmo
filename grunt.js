grunt = require("grunt");
grunt.loadNpmTasks('grunt-typescript');
grunt.loadNpmTasks('grunt-jam');
grunt.initConfig({
  watch: {
    files:[
      'src/**/*.ts'
    ],
    tasks: 'typescript'
  },
  jam: {
    dist: {
      dest: 'lib/vendor.js'
    }
  },
  typescript: {
    base: {
      src: ['src/*.ts'],
      dest: 'lib/all.js',
      options: {
        module: 'amd', //or commonjs
        target: 'es5',
        base_path: 'src'
      }
    }
  }
});
