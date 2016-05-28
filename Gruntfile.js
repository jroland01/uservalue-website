module.exports = function(grunt) {

  //Laod all tasks 
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  	

    //Bake uservalue.ch website from app  
    bake: {
      buildfooterfr: { 
        options: {
                content: 'app/configurations/footer.json',
                section: 'fr'
        },
        files: {
          'app/includes/footer/footer-fr.html': 'app/includes/footer/footerapp/footer.html'
        }
      },
      buildfooterde: { 
        options: {
                content: 'app/configurations/footer.json',
                section: 'de'
        },
        files: {
          'app/includes/footer/footer-de.html': 'app/includes/footer/footerapp/footer.html'
        }
      },
      buildfooteren: { 
        options: {
                content: 'app/configurations/footer.json',
                section: 'en'
        },
        files: {
          'app/includes/footer/footer-en.html': 'app/includes/footer/footerapp/footer.html'
        }
      },
      builddefault: { 
        options: {
                content: 'app/configurations/home.json',
                section: 'default'
        },
        files: {
          'index.html': 'app/home.html'
        }
      },
      buildfr: { 
        options: {
                content: 'app/configurations/home.json',
                section: 'fr'
        },
        files: {
          'fr.html': 'app/home.html'
        }
      },
      buildde: { 
        options: {
                content: 'app/configurations/home.json',
                section: 'de'
        },
        files: {
          'de.html': 'app/home.html'
        }
      },
      builden: { 
        options: {
                content: 'app/configurations/home.json',
                section: 'en'
        },
        files: {
          'en.html': 'app/home.html'
        }
      },
      buildet: { 
        options: {
                content: 'app/configurations/eye-tracking.json'
        },
        files: {
          'eye-tracking.html': 'app/landing.html'
        }
      },
      buildiut: { 
        options: {
                content: 'app/configurations/international-user-tests.json'
        },
        files: {
          'international-user-tests.html': 'app/landing.html'
        }
      },
      buildcux: { 
        options: {
                content: 'app/configurations/certification-ux.json'
        },
        files: {
          'certification-ux.html': 'app/landing.html'
        }
      },
      buildtab: { 
        options: {
                content: 'app/configurations/tests-ab.json'
        },
        files: {
          'tests-ab.html': 'app/landing.html'
        }
      }
    },

    //Remove url background cover from styles.css to avoid flickering on page load
    'string-replace': {
      styles: {
        src: 'css/styles.css',             
        dest: 'css/styles_nocover.css',           
        options: {
          replacements: [{
            pattern: /background:(.*)uv-cover-image(.*)/ig,      
            replacement: '/*background:$1uv-cover-image$2*/'
            }]
          }    
        }, 
      
    //Adjust paths for production environment
      dist: {
        src: ['dist/*.html','dist/css/*.css'],             
        dest: 'dist/',           
        options: {
          replacements: [{
            pattern: /\/dist/ig,      
            replacement: ''
            }]
          }    
        } 
    },

    //Minify CSS files, with url background image, and without
    cssmin: {
    	withcover: {
      		files: {
         		'dist/css/styles.min.css': ['css/styles.css']
      				}
      			},
    	nocover: {
      		files: {
         		'dist/css/styles.min.css': ['css/styles_nocover.css']
      				}
      			}      			
			},

    // Watch for changes in styles.css and udpdate styles_nocover.css, styles.min.css
    watch: {
      build: {
        files: ['css/styles.css','app/includes/**'],
        tasks: ['cssmin:withcover','bake'],
        options: {
          livereload: 35729,
        }
      }
    },
    
    //Inline CSS critical path in HTML source files
    critical: {
        all: {	
        	options: {
            base : './',
            css: 'dist/css/styles.min.css',
            width: 980,
            height: 900,
            minify: true,
            inlineImages: false
         	},
        	src: ['index.html','fr.html','de.html','en.html','eye-tracking.html','certification-ux.html','international-user-tests.html','tests-ab.html'], 
        	dest: 'dist/'
			   },
    	}
  });


  grunt.registerTask('scriptmin', ['uglify:mescripts']);

  grunt.registerTask('stylescomment', ['newer:string-replace:styles']);

  grunt.registerTask('distpath', ['string-replace:dist']);

  grunt.registerTask('withcovermin', ['cssmin:withcover']);

  grunt.registerTask('nocovermin', ['cssmin:nocover']);

  grunt.registerTask('csscritical', ['critical:all']);

  grunt.registerTask('bakefooter', ['bake:buildfooterfr','bake:buildfooterde','bake:buildfooteren']);

  grunt.registerTask('bakehtml',['cssmin:withcover','bakefooter','bake:builddefault','bake:buildfr','bake:buildde','bake:builden','bake:buildet','bake:buildiut','bake:buildcux','bake:buildtab']); 

  grunt.registerTask('generatecritical', ['critical:all','string-replace:styles','cssmin:nocover','distpath']);

  grunt.registerTask('build', ['bakehtml','generatecritical']);

};