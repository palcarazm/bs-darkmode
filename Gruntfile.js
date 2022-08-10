module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    banner:
      "/* Copyright Notice\n" +
      " * <%= pkg.name %> v<%= pkg.version %>\n" +
      " * <%= pkg.homepage %>\n" +
      " * @author 2022 Pablo Alcaraz Martínez (https://github.com/palcarazm)\n" +
      " * @funding <%= pkg.funding.type %>\n" +
      " * @see <%= pkg.funding.url %>\n" +
      " * @license <%= pkg.license %>\n" +
      " * @see https://github.com/palcarazm/bs-darkmode/blob/master/LICENSE\n" +
      " */\n",
    clean: ["dist"],
    uglify: {
      options: {
        preserveComments: false,
        sourceMap: true,
      },
      build: {
        files:[
          {
            expand: true,
            cwd: "js",
            src: "bs-darkmode.jquery.js",
            dest: "js",
            ext: "jquery.min.js",
          },
          {
            expand: true,
            cwd: "js",
            src: "bs-darkmode.ecmas.js",
            dest: "js",
            ext: ".ecmas.min.js",
          }
      ]
      },
    },
    cssmin: {
      options: {
        keepBreaks: true,
        sourceMap: true,
      },
      build: {
        expand: true,
        cwd: "css",
        src: ["**/*.css", ["!**/*.min.css"]],
        dest: "css",
        ext: ".min.css",
      },
    },
    usebanner: {
      taskName: {
        options: {
          position: "top",
          banner: "<%= banner %>",
          linebreak: true,
          replace: true,
        },
        files: {
          src: ["css/*.css", "js/*.js"],
        },
      },
    },
  });
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-banner");
  grunt.registerTask("default", ["clean", "uglify", "cssmin", "usebanner"]);
};
