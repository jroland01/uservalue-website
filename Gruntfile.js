module.exports = function(grunt) {

  //Laod all tasks 
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  	
    // Dirs configuration
    dirs: {
        configurations: 'app/configurations',
        contents: 'app/contents',
        includes: 'app/includes',
        jsontemp: 'temp/json',
        public: 'dist'
    },

    //Extract Front Matter from .md files to JSON
    frontmatter: {
    configurations: {
        options: {
        	width: 0
        },
        files: {
            '<%= dirs.jsontemp %>/services/fr/services.json': ['<%= dirs.contents %>/services/fr/*.md'],
            '<%= dirs.jsontemp %>/services/de/services.json': ['<%= dirs.contents %>/services/de/*.md'],
            '<%= dirs.jsontemp %>/services/en/services.json': ['<%= dirs.contents %>/services/en/*.md'],
            '<%= dirs.jsontemp %>/profiles/fr/profiles.json': ['<%= dirs.contents %>/profiles/fr/*.md'],
            '<%= dirs.jsontemp %>/profiles/de/profiles.json': ['<%= dirs.contents %>/profiles/de/*.md'],
            '<%= dirs.jsontemp %>/profiles/en/profiles.json': ['<%= dirs.contents %>/profiles/en/*.md'],
            '<%= dirs.jsontemp %>/landing.json': ['<%= dirs.contents %>/*.md']
        },
    	}
	},

    //Build HTML from .md files (without Front Matter)
    md2html: {
      multiple_files: {
        options: {},
        files: [{
          expand: true,
          cwd: 'temp/',
          src: ['**/*.md'],
          dest: '<%= dirs.includes %>',
          ext: '.html'
        }]
      }
    },

    //Bake uservalue.ch website from app  
    bake: {
      
      // Bake includes

      // Bake footer
      buildfooterfr: { 
        options: {
                content: '<%= dirs.configurations %>/footer.json',
                section: 'fr'
        },
        files: {
          '<%= dirs.includes %>/footer/fr/footer.html': '<%= dirs.includes %>/footer/footerapp/footer.html'
        }
      },
      buildfooterde: { 
        options: {
                content: '<%= dirs.configurations %>/footer.json',
                section: 'de'
        },
        files: {
          '<%= dirs.includes %>/footer/de/footer.html': '<%= dirs.includes %>/footer/footerapp/footer.html'
        }
      },
      buildfooteren: { 
        options: {
                content: '<%= dirs.configurations %>/footer.json',
                section: 'en'
        },
        files: {
          '<%= dirs.includes %>/footer/en/footer.html': '<%= dirs.includes %>/footer/footerapp/footer.html'
        }
      },
      
      // Bake team
      buildteamfr: { 
        options: {
                content: '<%= dirs.jsontemp %>/profiles/fr/profiles.json',
        },
        files: {
          '<%= dirs.includes %>/profiles/fr/profiles.html': '<%= dirs.includes %>/profiles/profilesapp/profiles.html'
        }
      },
      buildteamde: { 
        options: {
                content: '<%= dirs.jsontemp %>/profiles/de/profiles.json',
        },
        files: {
          '<%= dirs.includes %>/profiles/de/profiles.html': '<%= dirs.includes %>/profiles/profilesapp/profiles.html'
        }
      },
      buildteamen: { 
        options: {
                content: '<%= dirs.jsontemp %>/profiles/en/profiles.json',
        },
        files: {
          '<%= dirs.includes %>/profiles/en/profiles.html': '<%= dirs.includes %>/profiles/profilesapp/profiles.html'
        }
      },
      
      // Bake services
      buildservicesfr: { 
        options: {
                content: '<%= dirs.jsontemp %>/services/fr/services.json'
        },
        files: {
          '<%= dirs.includes %>/services/fr/services.html': '<%= dirs.includes %>/services/servicesapp/services.html'
        }
      },
      buildservicesde: { 
        options: {
                content: '<%= dirs.jsontemp %>/services/de/services.json'
        },
        files: {
          '<%= dirs.includes %>/services/de/services.html': '<%= dirs.includes %>/services/servicesapp/services.html'
        }
      },
      buildservicesen: { 
        options: {
                content: '<%= dirs.jsontemp %>/services/en/services.json'
        },
        files: {
          '<%= dirs.includes %>/services/en/services.html': '<%= dirs.includes %>/services/servicesapp/services.html'
        }
      },
      
      // Bake pages

      // Bake home page
      builddefault: { 
        options: {
                content: '<%= dirs.configurations %>/home.json',
                section: 'default'
        },
        files: {
          'index.html': 'app/home.html'
        }
      },
      buildfr: { 
        options: {
                content: '<%= dirs.configurations %>/home.json',
                section: 'fr'
        },
        files: {
          'fr/index.html': 'app/home.html'
        }
      },
      buildde: { 
        options: {
                content: '<%= dirs.configurations %>/home.json',
                section: 'de'
        },
        files: {
          'de/index.html': 'app/home.html'
        }
      },
      builden: { 
        options: {
                content: '<%= dirs.configurations %>/home.json',
                section: 'en'
        },
        files: {
          'en/index.html': 'app/home.html'
        }
      },
      
      // Bake landing pages (add new landing page here)
      buildet: { 
        options: {
                content: '<%= dirs.jsontemp %>/landing.json',
                section: 'eye-tracking'
        },
        files: {
          'fr/eye-tracking/index.html': 'app/landing.html'
        }
      },
      buildiut: { 
        options: {
                content: '<%= dirs.jsontemp %>/landing.json',
                section: 'international-user-tests'
        },
        files: {
          'en/international-user-tests/index.html': 'app/landing.html'
        }
      },
      buildmd: { 
        options: {
                content: '<%= dirs.jsontemp %>/landing.json',
                section: 'usability-testing-medical-devices'
        },
        files: {
          'en/usability-testing-medical-devices/index.html': 'app/landing.html'
        }
      },
      buildcux: { 
        options: {
                content: '<%= dirs.jsontemp %>/landing.json',
                section: 'certification-ux'
        },
        files: {
          'fr/certification-ux/index.html': 'app/landing.html'
        }
      },
      buildtab: { 
        options: {
                content: '<%= dirs.jsontemp %>/landing.json',
                section: 'tests-ab'
        },
        files: {
          'fr/tests-ab/index.html': 'app/landing.html'
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
        src: ['<%= dirs.public %>/**/*.html','<%= dirs.public %>/css/*.css'],             
        dest: '<%= dirs.public %>/',           
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
        cwd: '<%= dirs.contents %>/',
        src: ['**/*.md'],             
        dest: 'temp/',           
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
         		'<%= dirs.public %>/css/styles.min.css': ['css/styles.css']
      				}
      			},
    	nocover: {
      		files: {
         		'<%= dirs.public %>/css/styles.min.css': ['css/styles_nocover.css']
      				}
      			}      			
			},
    
    //Inline CSS critical path in HTML source files
    critical: {
        all: {	
        	options: {
            base : './',
            css: '<%= dirs.public %>/css/styles.min.css',
            width: 980,
            height: 900,
            minify: true,
            inlineImages: false
         	},
          src: ['*.html','fr/**/*.html','de/**/*.html','en/**/*.html'],  
        	dest: '<%= dirs.public %>/'
			   },
    	}
  });


  // Register individual tasks
  grunt.registerTask('fronttojson', ['frontmatter:configurations']);

  grunt.registerTask('marktohtml', ['md2html']);

  grunt.registerTask('stylescomment', ['newer:string-replace:styles']);

  grunt.registerTask('distpath', ['string-replace:dist']);

  grunt.registerTask('stripfrontmatter', ['string-replace:contents']);

  grunt.registerTask('withcovermin', ['cssmin:withcover']);

  grunt.registerTask('nocovermin', ['cssmin:nocover']);

  grunt.registerTask('csscritical', ['critical:all']);

  
  // Register grouped tasks
  grunt.registerTask('bakefooter', ['bake:buildfooterfr','bake:buildfooterde','bake:buildfooteren']);

  grunt.registerTask('baketeam', ['bake:buildteamfr','bake:buildteamde','bake:buildteamen']);

  grunt.registerTask('bakeservices', ['bake:buildservicesfr','bake:buildservicesde','bake:buildservicesen']);

  grunt.registerTask('readfrontmatter', ['frontmatter:configurations','string-replace:contents']);

  grunt.registerTask('bakehtml',['cssmin:withcover','marktohtml','bakefooter','baketeam','bakeservices','bake:builddefault','bake:buildfr','bake:buildde','bake:builden','bake:buildet','bake:buildiut','bake:buildmd','bake:buildcux','bake:buildtab']); 

  grunt.registerTask('generatecritical', ['critical:all','string-replace:styles','cssmin:nocover','distpath']);

  
  // Register build task
  grunt.registerTask('build', ['readfrontmatter','bakehtml','generatecritical']);

};