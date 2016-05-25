module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  	
    //Uglify mes_scripts.js and move to dist
    uglify: {
      mescripts: {
        files: {
          'dist/js/mes_scripts.min.js': ['src/js/mes_scripts.js']
              }
            }
      },

    //Remove url background cover from styles.css to avoid flickering on page load
    'string-replace': {
      styles: {
        src: 'src/css/styles.css',             
        dest: 'src/css/styles_nocover.css',           
        options: {
          replacements: [{
            pattern: /background:(.*)uv-cover-image(.*)/ig,      
            replacement: '/*background:$1uv-cover-image$2*/'
            }]
          }    
        } 
    },

    //Minify CSS files, with url background image, and without
    cssmin: {
    	withcover: {
      		files: {
         		'dist/css/styles.min.css': ['src/css/styles.css']
      				}
      			},
    	nocover: {
      		files: {
         		'dist/css/styles.min.css': ['src/css/styles_nocover.css']
      				}
      			}      			
			},
    
    
    //Inline CSS critical path in HTML source files
    critical: {
        index: {	
        	options: {
            base : './',
            css: 'dist/css/styles.min.css',
            width: 1280,
            height: 1024,
            minify: true,
            inlineImages: true
         	},
        	src: 'src/index.html', 
        	dest: 'dist/index.html'
			   },
         fr: { 
          options: {
            base : './',
            css: 'dist/css/styles.min.css',
            width: 1280,
            height: 1024,
            minify: true,
            inlineImages: true
          },
          src: 'src/fr.html', 
          dest: 'dist/fr.html'
         },
         de: { 
          options: {
            base : './',
            css: 'dist/css/styles.min.css',
            width: 1280,
            height: 1024,
            minify: true,
            inlineImages: true
          },
          src: 'src/de.html', 
          dest: 'dist/de.html'
         },
         en: { 
          options: {
            base : './',
            css: 'dist/css/styles.min.css',
            width: 1280,
            height: 1024,
            minify: true,
            inlineImages: true
          },
          src: 'src/en.html', 
          dest: 'dist/en.html'
         },
         eyetracking: { 
          options: {
            base : './',
            css: 'dist/css/styles.min.css',
            width: 1280,
            height: 1024,
            minify: true,
            inlineImages: true
          },
          src: 'src/eye-tracking.html', 
          dest: 'dist/eye-tracking.html'
         },
         certificationux: { 
          options: {
            base : './',
            css: 'dist/css/styles.min.css',
            width: 1280,
            height: 1024,
            minify: true,
            inlineImages: true
          },
          src: 'src/certification-ux.html', 
          dest: 'dist/certification-ux.html'
         },
         internationalusertests: { 
          options: {
            base : './',
            css: 'dist/css/styles.min.css',
            width: 1280,
            height: 1024,
            minify: true,
            inlineImages: true
          },
          src: 'src/international-user-tests.html', 
          dest: 'dist/international-user-tests.html'
         },
         testsab: { 
          options: {
            base : './',
            css: 'dist/css/styles.min.css',
            width: 1280,
            height: 1024,
            minify: true,
            inlineImages: true
          },
          src: 'src/tests-ab.html', 
          dest: 'dist/tests-ab.html'
         },
    	}

  });

  // Load the plugin that provides the uglify task
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the plugin that provides the string replace task  
  grunt.loadNpmTasks('grunt-string-replace');

  // Load the plugin that provides the minify task
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Load the plugin that provides the critical task
  grunt.loadNpmTasks('grunt-critical');

 

  grunt.registerTask('scriptmin', ['uglify:mescripts']);

  grunt.registerTask('stylescomment', ['string-replace']);

  grunt.registerTask('withcovermin', ['cssmin:withcover']);

  grunt.registerTask('nocovermin', ['cssmin:nocover']);

  grunt.registerTask('csscritical', ['critical']);

  grunt.registerTask('default', ['string-replace','cssmin:withcover','critical','cssmin:nocover']);

};