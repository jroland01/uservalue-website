module.exports = function(grunt) {

  //Laod all tasks 
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  	
    //Extract Front Matter from .md files to JSON
    frontmatter: {
    configurations: {
        options: {
        	width: 0
        },
        files: {
            'temporary/json/services/fr/services.json': ['app/contents/services/fr/*.md'],
            'temporary/json/services/de/services.json': ['app/contents/services/de/*.md'],
            'temporary/json/services/en/services.json': ['app/contents/services/en/*.md'],
            'temporary/json/profiles/fr/profiles.json': ['app/contents/profiles/fr/*.md'],
            'temporary/json/profiles/de/profiles.json': ['app/contents/profiles/de/*.md'],
            'temporary/json/profiles/en/profiles.json': ['app/contents/profiles/en/*.md'],
            'temporary/json/landing.json': ['app/contents/*.md']
        },
    	}
	},

    //Build HTML from .md files (without Front Matter)
    md2html: {
      multiple_files: {
        options: {},
        files: [{
          expand: true,
          cwd: 'temporary/',
          src: ['**/*.md'],
          dest: 'app/includes',
          ext: '.html'
        }]
      }
    },

    //Bake uservalue.ch website from app  
    bake: {
      
      // Bake footer
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
      
      // Bake team
      buildteamfr: { 
        options: {
                content: 'temporary/json/profiles/fr/profiles.json',
        },
        files: {
          'app/includes/profiles/profiles-fr.html': 'app/includes/profiles/profilesapp/profiles.html'
        }
      },
      buildteamde: { 
        options: {
                content: 'temporary/json/profiles/de/profiles.json',
        },
        files: {
          'app/includes/profiles/profiles-de.html': 'app/includes/profiles/profilesapp/profiles.html'
        }
      },
      buildteamen: { 
        options: {
                content: 'temporary/json/profiles/en/profiles.json',
        },
        files: {
          'app/includes/profiles/profiles-en.html': 'app/includes/profiles/profilesapp/profiles.html'
        }
      },
      
      // Bake services
      buildservicesfr: { 
        options: {
                content: 'temporary/json/services/fr/services.json'
        },
        files: {
          'app/includes/services/services-fr.html': 'app/includes/services/servicesapp/services.html'
        }
      },
      buildservicesde: { 
        options: {
                content: 'temporary/json/services/de/services.json'
        },
        files: {
          'app/includes/services/services-de.html': 'app/includes/services/servicesapp/services.html'
        }
      },
      buildservicesen: { 
        options: {
                content: 'temporary/json/services/en/services.json'
        },
        files: {
          'app/includes/services/services-en.html': 'app/includes/services/servicesapp/services.html'
        }
      },
      
      // Bake home page
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
      
      // Bake landing pages
      buildet: { 
        options: {
                content: 'temporary/json/landing.json',
                section: 'eye-tracking'
        },
        files: {
          'eye-tracking.html': 'app/landing.html'
        }
      },
      buildiut: { 
        options: {
                content: 'temporary/json/landing.json',
                section: 'international-user-tests'
        },
        files: {
          'international-user-tests.html': 'app/landing.html'
        }
      },
      buildcux: { 
        options: {
                content: 'temporary/json/landing.json',
                section: 'certification-ux'
        },
        files: {
          'certification-ux.html': 'app/landing.html'
        }
      },
      buildtab: { 
        options: {
                content: 'temporary/json/landing.json',
                section: 'tests-ab'
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
        }, 

     //Strip Front Matter from .md files
      contents: {
        expand: true,
        cwd: 'app/contents/',
        src: ['**/*.md'],             
        dest: 'temporary/',           
        options: {
          replacements: [{
            pattern: /---\n[\s\S]*\n---\n/,      
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

  grunt.registerTask('fronttojson', ['frontmatter:configurations']);

  grunt.registerTask('marktohtml', ['md2html']);

  grunt.registerTask('stylescomment', ['newer:string-replace:styles']);

  grunt.registerTask('distpath', ['string-replace:dist']);

  grunt.registerTask('stripfrontmatter', ['string-replace:contents']);

  grunt.registerTask('withcovermin', ['cssmin:withcover']);

  grunt.registerTask('nocovermin', ['cssmin:nocover']);

  grunt.registerTask('csscritical', ['critical:all']);

  grunt.registerTask('bakefooter', ['bake:buildfooterfr','bake:buildfooterde','bake:buildfooteren']);

  grunt.registerTask('baketeam', ['bake:buildteamfr','bake:buildteamde','bake:buildteamen']);

  grunt.registerTask('bakeservices', ['bake:buildservicesfr','bake:buildservicesde','bake:buildservicesen']);

  grunt.registerTask('readfrontmatter', ['frontmatter:configurations','string-replace:contents']);

  grunt.registerTask('bakehtml',['cssmin:withcover','marktohtml','bakefooter','baketeam','bakeservices','bake:builddefault','bake:buildfr','bake:buildde','bake:builden','bake:buildet','bake:buildiut','bake:buildcux','bake:buildtab']); 

  grunt.registerTask('generatecritical', ['critical:all','string-replace:styles','cssmin:nocover','distpath']);

  grunt.registerTask('build', ['readfrontmatter','bakehtml','generatecritical']);

};