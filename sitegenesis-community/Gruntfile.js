'use strict';

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	// command line arguments
	var config = {};
	// mocha ui tests
	config.suite = grunt.option('suite') || '*';
	if (config.suite === 'all') { config.suite === '*'; }
	config.reporter = grunt.option('reporter') || 'spec';
	config.timeout = grunt.option('timeout') || 10000;
	config.port = grunt.option('port') || 7000;

	var paths = require('./package.json').paths;

	grunt.initConfig({
		watch: {
			sass: {
				files: paths.css.map(function (path) {
					return path.src + '*.scss';
				}),
				tasks: ['css']
			}
		},
		sass: {
			dev: {
				options: {
					style: 'expanded',
					sourcemap: true
				},
				files: paths.css.map(function (path) {
					return {src: path.src + 'style.scss', dest: path.dest + 'style.css'}
				})
			}
		},
		autoprefixer: {
			dev: {
				files: paths.css.map(function (path) {
					return {src: path.dest + 'style.css', dest: path.dest + 'style.css'}
				})
			}
		},
		browserify: {
			dist: {
				files: [{
					src: paths.js.src + 'app.js',
					dest: paths.js.dest + 'app.js'
				}]
			},
			watch: {
				files: [{
					src: paths.js.src + 'app.js',
					dest: paths.js.dest + 'app.js'
				}],
				options: {
					watch: true
				}
			},
			test: {
				files: [{
					expand: true,
					cwd: 'test/unit/browser/',
					src: ['*.js', '!*.out.js'],
					dest: 'test/unit/browser/dist'
				}]
			}
		},
		connect: {
			test: {
				options: {
					port: config.port,
					base: 'test/unit/browser'
				}
			}
		},
		jscs: {
			src: '**/*.js',
			options: {
				config: './.jscsrc'
			}
		},
		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				jshintrc: true
			},
			target: ['app_storefront_richUI/cartridge/js/**/*.js']
		},
		mochaTest: {
			application: {
				options: {
					reporter: config.reporter,
					timeout: config.timeout
				},
				src: ['test/application/' + config.suite + '/**/*.js', '!test/application/webdriver/*']
			},
			unit: {
				options: {
					reporter: config.reporter,
					timeout: config.timeout
				},
				src: ['test/unit/' + config.suite + '/**/*.js', '!test/unit/browser/**/*', '!test/unit/webdriver/*']
			}
		}
	});

	grunt.registerTask('css', ['sass', 'autoprefixer']);
	grunt.registerTask('default', ['css', 'browserify:watch', 'watch']);
	grunt.registerTask('js', ['browserify:dist']);
	grunt.registerTask('test:application', ['mochaTest:application']);
	grunt.registerTask('test:unit', ['browserify:test', 'connect:test', 'mochaTest:unit'])
}
