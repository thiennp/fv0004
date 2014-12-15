"use strict"
LIVERELOAD_PORT = 35728
lrSnippet = require("connect-livereload")(port: LIVERELOAD_PORT)

# var conf = require('./conf.'+process.env.NODE_ENV);
mountFolder = (connect, dir) ->
	connect.static require("path").resolve(dir)


# # Globbing
# for performance reasons we're only matching one level down:
# 'test/spec/{,*}*.js'
# use this if you want to recursively match all subfolders:
# 'test/spec/**/*.js'
module.exports = (grunt) ->
	require("load-grunt-tasks") grunt
	require("time-grunt") grunt
	
	# configurable paths
	yeomanConfig =
		app: "client"
		dist: "dist"

	try
		wakandaApp = require("./wakandaApp.json")
	catch e
		currentTaskFromCli = process.argv.slice(2)
		grunt.fail.warn "wakandaApp.json file missing. Please run grunt initConfig to create it and then customize it"  if currentTaskFromCli.length and currentTaskFromCli[0] isnt "initConfig"

	try
		yeomanConfig.app = require("./bower.json").appPath or yeomanConfig.app

	proxyMiddleware = (connect, options) ->
		middlewares = []
		directory = options.directory or options.base[options.base.length - 1]
		options.base = [options.base]  unless Array.isArray(options.base)
	  
		# Setup the proxy
		middlewares.push require("grunt-connect-proxy/lib/utils").proxyRequest
		options.base.forEach (base) ->
		
			# Serve static files.
			middlewares.push connect.static(base)
			return

		middlewares.push connect().use("/bower_components", connect.static("./bower_components"))  if options.buildMode isnt true #don't connect bower_components in build mode - it will be minified
		# Make directory browse-able.
		middlewares.push connect.directory(directory)
		middlewares

	grunt.initConfig
		yeoman: yeomanConfig
		wakandaApp : wakandaApp
		watch:
			js:
				files: ["<%= yeoman.app %>/scripts/**/*.js"]
				tasks: ["jshint", "copy:js"]

			compass:
				files: ["<%= yeoman.app %>/styles/**/*.{scss,sass}"]
				tasks: ["compass:server"]

			# less:
			#	 files: ["<%= yeoman.app %>/styles/**/*.less"]
			#	 tasks: ["less:server"]

			livereload:
				options:
					livereload: LIVERELOAD_PORT

				files: [
					"<%= yeoman.app %>/index.html"
					"<%= yeoman.app %>/views/**/*.html"
					"<%= yeoman.app %>/styles/**/*.scss"
					# "<%= yeoman.app %>/styles/**/*.less"
					".tmp/styles/**/*.css"
					"{.tmp,<%= yeoman.app %>}/scripts/**/*.js"
					"<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}"
				]

		connect:
			proxies: [{
				context: '/rest'
				host: '<%= wakandaApp.host %>'
				port: '<%= wakandaApp.port %>'
				https: false
				changeOrigin: false
				xforward: false
			}]
			options:
				port: 9000
				# Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost'
				livereload: 35729
			livereload:
				options:
					open: true,
					base : [
						'.tmp',
						yeomanConfig.app
					],
					middleware: proxyMiddleware
			test:
				options:
					middleware: (connect) ->
						[
							connect.static '.tmp' 
							connect.static 'test' 
							connect().use '/bower_components', connect.static('./bower_components')
							connect.static appConfig.app
						]
			dist:
				options:
					open: true,
					buildMode : true,
					base: '<%= yeoman.dist %>',
					middleware: proxyMiddleware

		open:
			server:
				url: "http://localhost:<%= connect.options.port %>"

		clean:
			dist:
				files: [
					dot: true
					src: [".tmp", "<%= yeoman.dist %>/*", "!<%= yeoman.dist %>/.git*"]
				]
			all: [
				".tmp", ".sass-cache"
				"client/bower_components"
				"documentation/jade", "documentation/config.codekit", "documentation/codekit-config.json"
				"landing/jade", "landing/config.codekit"
				"node_modules"
				".git"
			]
			server: ".tmp"

		jshint:
			options:
				jshintrc: ".jshintrc"

			all: ["Gruntfile.js", "<%= yeoman.app %>/scripts/**/*.js"]

		compass:
			options:
				sassDir: "<%= yeoman.app %>/styles"
				cssDir: ".tmp/styles"
				generatedImagesDir: ".tmp/styles/ui/images/"
				imagesDir: "<%= yeoman.app %>/styles/ui/images/"
				javascriptsDir: "<%= yeoman.app %>/scripts"
				fontsDir: "<%= yeoman.app %>/fonts"
				importPath: "<%= yeoman.app %>/bower_components"
				httpImagesPath: "styles/ui/images/"
				httpGeneratedImagesPath: "styles/ui/images/"
				httpFontsPath: "fonts"
				relativeAssets: true

			dist:
				options:
					debugInfo: false
					noLineComments: true
			server:
				options:
					debugInfo: true
			forvalidation:
				options:
					debugInfo: false
					noLineComments: false
		# if you want to use the compass config.rb file for configuration:
		# compass:
		#   dist:
		#	 options:
		#	   config: 'config.rb'

		# less:
		#	 server:
		#		 options:
		#			 strictMath: true
		#			 dumpLineNumbers: true
		#			 sourceMap: true
		#			 sourceMapRootpath: ""
		#			 outputSourceFiles: true
		#		 files: [
		#			 expand: true
		#			 cwd: "<%= yeoman.app %>/styles"
		#			 src: "main.less"
		#			 dest: ".tmp/styles"
		#			 ext: ".css"					
		#		 ]
		#	 dist:
		#		 options:
		#			 cleancss: true,
		#			 report: 'min'
		#		 files:
		#			 '.tmp/styles/addon.css': '<%= yeoman.app %>/styles/addon.less'


		useminPrepare:
			html: "<%= yeoman.app %>/index.html"
			options:
				dest: "<%= yeoman.dist %>"
				flow:
					steps:
						js: ["concat"]
						css: ["concat"]
					post: []

		
		# 'css': ['concat']
		usemin:
			html: ["<%= yeoman.dist %>/**/*.html", "!<%= yeoman.dist %>/bower_components/**"]
			css: ["<%= yeoman.dist %>/styles/**/*.css"]
			options:
				dirs: ["<%= yeoman.dist %>"]

		htmlmin:
			dist:
				options: {}
				
				#removeCommentsFromCDATA: true,
				#					// https://github.com/yeoman/grunt-usemin/issues/44
				#					//collapseWhitespace: true,
				#					collapseBooleanAttributes: true,
				#					removeAttributeQuotes: true,
				#					removeRedundantAttributes: true,
				#					useShortDoctype: true,
				#					removeEmptyAttributes: true,
				#					removeOptionalTags: true
				files: [
					expand: true
					cwd: "<%= yeoman.app %>"
					src: ["*.html", "views/*.html"]
					dest: "<%= yeoman.dist %>"
				]

		
		# Put files not handled in other tasks here
		copy:
			dist:
				files: [
					expand: true
					dot: true
					cwd: "<%= yeoman.app %>"
					dest: "<%= yeoman.dist %>"
					src: [
						"favicon.ico"
						# bower components that has image, font dependencies
						"bower_components/font-awesome/css/*"
						"bower_components/font-awesome/fonts/*"
						"bower_components/weather-icons/css/*"
						"bower_components/weather-icons/fonts/*"

						"fonts/**/*"
						"i18n/**/*"
						"images/**/*"
						"styles/bootstrap/**/*"
						"styles/fonts/**/*"
						"styles/img/**/*"
						"styles/ui/images/**/*"
						"views/**/*"
					]
				,
					expand: true
					cwd: ".tmp"
					dest: "<%= yeoman.dist %>"
					src: ["styles/**", "assets/**"]
				,
					expand: true
					cwd: ".tmp/images"
					dest: "<%= yeoman.dist %>/images"
					src: ["generated/*"]
				]

			js:
				expand: true
				cwd: "<%= yeoman.app %>/scripts"
				dest: ".tmp/scripts/"
				src: "**/*.*"

			styles:
				expand: true
				cwd: "<%= yeoman.app %>/styles"
				dest: ".tmp/styles/"
				src: "**/*.css"

		concurrent:
			server: ["copy:js", "compass:server", "copy:styles"]
			dist: ["copy:js", "compass:dist", "copy:styles", "htmlmin"]

		concat:
			options:
				separator: grunt.util.linefeed + ';' + grunt.util.linefeed
			dist:
				src: ["<%= yeoman.dist %>/bower_components/angular/angular.min.js"]
				dest: "<%= yeoman.dist %>/scripts/vendor.js"

		uglify:
			options:
				mangle: false
			dist:
				files:
					"<%= yeoman.dist %>/scripts/app.js": [".tmp/**/*.js", "<%= yeoman.app %>/scripts/**/*.js"]

	grunt.registerTask "server", (target) ->
		return grunt.task.run(["serve:dist"])  if target is "dist"
		grunt.task.run(["serve"])

	grunt.registerTask "serve", (target) ->
		return grunt.task.run(["build", "open", "connect:dist:keepalive"])  if target is "dist"
		grunt.task.run ["clean:server", "concurrent:server", "configureProxies:server", "connect:livereload", "open", "watch"]

	grunt.registerTask "build", ["clean:dist", "useminPrepare", "concurrent:dist", "copy:dist", "concat", "uglify", "usemin"]
	grunt.registerTask "default", ["server"]