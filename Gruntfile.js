module.exports = function(grunt) {

    grunt.initConfig({
	jasmine: {
	    src: 'js/*.js',
	    options: {
		specs: 'spec/*Spec.js',
		vendor: 'http://code.createjs.com/easeljs-0.6.0.min.js'
	    }
	}
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['jasmine']);
};
