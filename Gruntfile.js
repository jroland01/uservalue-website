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
    /*frontmatter: {
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
            '<%= dirs.jsontemp %>/profiles/en/profiles.json': ['<%= dirs.contents %>/profiles/en/*.md']
        }
    	}
	},*/

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

      // Bake landing pages
      buildlandingfr: { 
        options: {
                content: '<%= dirs.configurations %>/landingpages.json',
                section: 'fr'
        },
        files: {
          '<%= dirs.includes %>/landingpages/fr/landingpages.html': '<%= dirs.includes %>/landingpages/landingpagesapp/landingpages.html',
          '<%= dirs.includes %>/landingpages/fr/landingpagesphone.html': '<%= dirs.includes %>/landingpages/landingpagesapp/landingpagesphone.html'
        }
      },
      buildlandingde: { 
        options: {
                content: '<%= dirs.configurations %>/landingpages.json',
                section: 'de'
        },
        files: {
          '<%= dirs.includes %>/landingpages/de/landingpages.html': '<%= dirs.includes %>/landingpages/landingpagesapp/landingpages.html',
          '<%= dirs.includes %>/landingpages/de/landingpagesphone.html': '<%= dirs.includes %>/landingpages/landingpagesapp/landingpagesphone.html'
        }
      },
      buildlandingen: { 
        options: {
                content: '<%= dirs.configurations %>/landingpages.json',
                section: 'en'
        },
        files: {
          '<%= dirs.includes %>/landingpages/en/landingpages.html': '<%= dirs.includes %>/landingpages/landingpagesapp/landingpages.html',
          '<%= dirs.includes %>/landingpages/en/landingpagesphone.html': '<%= dirs.includes %>/landingpages/landingpagesapp/landingpagesphone.html'
        }
      },

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
                content: '<%= dirs.configurations %>/profiles.json',
                section: 'fr'
        },
        files: {
          '<%= dirs.includes %>/profiles/fr/profiles.html': '<%= dirs.includes %>/profiles/profilesapp/profilesapp.html'
        }
      },
      buildteamde: { 
        options: {
                content: '<%= dirs.configurations %>/profiles.json',
                section: 'de'
        },
        files: {
          '<%= dirs.includes %>/profiles/de/profiles.html': '<%= dirs.includes %>/profiles/profilesapp/profilesapp.html'
        }
      },
      buildteamen: { 
        options: {
                content: '<%= dirs.configurations %>/profiles.json',
                section: 'en'
        },
        files: {
          '<%= dirs.includes %>/profiles/en/profiles.html': '<%= dirs.includes %>/profiles/profilesapp/profilesapp.html'
        }
      },
      
      // Bake services
      buildservicesfr: { 
        options: {
                content: '<%= dirs.configurations %>/services.json',
                section: 'fr'
        },
        files: {
          '<%= dirs.includes %>/services/fr/services.html': '<%= dirs.includes %>/services/servicesapp/servicesapp.html'
        }
      },
      buildservicesde: { 
        options: {
                content: '<%= dirs.configurations %>/services.json',
                section: 'de'
        },
        files: {
          '<%= dirs.includes %>/services/de/services.html': '<%= dirs.includes %>/services/servicesapp/servicesapp.html'
        }
      },
      buildservicesen: { 
        options: {
                content: '<%= dirs.configurations %>/services.json',
                section: 'en'
        },
        files: {
          '<%= dirs.includes %>/services/en/services.html': '<%= dirs.includes %>/services/servicesapp/servicesapp.html'
        }
      },
      
      // Bake clients
      buildclients: {
        options: {
                content: '<%= dirs.configurations %>/clients.json'
        },
        files: {
          '<%= dirs.includes %>/clients/clients.html': '<%= dirs.includes %>/clients/clientsapp/clientsapp.html'
        }
      },

      // Bake partners
      buildpartners: {
        options: {
                content: '<%= dirs.configurations %>/partners.json'
        },
        files: {
          '<%= dirs.includes %>/partners/partners.html': '<%= dirs.includes %>/partners/partnersapp/partnersapp.html'
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
      }
    },

    //Remove url background cover from styles_1801.css to avoid flickering on page load
    'string-replace': {
      styles: {
        src: 'css/styles_1801.css',             
        dest: 'css/styles_1801_nocover.css',           
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
         		'<%= dirs.public %>/css/styles_1801.min.css': ['css/styles_1801.css']
      				}
      			},
    	nocover: {
      		files: {
         		'<%= dirs.public %>/css/styles_1801.min.css': ['css/styles_1801_nocover.css']
      				}
      			}      			
			},
    
    //Inline CSS critical path in HTML source files
    critical: {
        all: {	
        	options: {
            inline : true,
            base : './',
            css: '<%= dirs.public %>/css/styles_1801.min.css',
            width: 980,
            height: 1200,
            minify: true,
            inlineImages: true
         	},
          src: ['*.html','fr/**/*.html','de/**/*.html','en/**/*.html'],  
        	dest: '<%= dirs.public %>/'
			   },
    	}
  });


  // Register individual tasks
  // grunt.registerTask('fronttojson', ['frontmatter:configurations']);

  grunt.registerTask('marktohtml', ['md2html']);

  grunt.registerTask('stylescomment', ['newer:string-replace:styles']);

  grunt.registerTask('distpath', ['string-replace:dist']);

  grunt.registerTask('stripfrontmatter', ['string-replace:contents']);

  grunt.registerTask('withcovermin', ['cssmin:withcover']);

  grunt.registerTask('nocovermin', ['cssmin:nocover']);

  grunt.registerTask('csscritical', ['critical:all']);

  
  // Register grouped tasks
  
  grunt.registerTask('bakelanding', ['bake:buildlandingfr','bake:buildlandingde','bake:buildlandingen']);

  grunt.registerTask('bakefooter', ['bake:buildfooterfr','bake:buildfooterde','bake:buildfooteren']);

  grunt.registerTask('baketeam', ['bake:buildteamfr','bake:buildteamde','bake:buildteamen']);

  grunt.registerTask('bakeservices', ['bake:buildservicesfr','bake:buildservicesde','bake:buildservicesen']);

  grunt.registerTask('bakeclients', ['bake:buildclients']);

  grunt.registerTask('bakepartners', ['bake:buildpartners']);

  // grunt.registerTask('readfrontmatter', ['frontmatter:configurations','string-replace:contents']);

  grunt.registerTask('bakehtml',['cssmin:withcover','marktohtml','bakelanding','bakefooter','baketeam','bakeservices','bakeclients','bakepartners','bake:builddefault','bake:buildfr','bake:buildde','bake:builden']); 

  grunt.registerTask('generatecritical', ['critical:all','string-replace:styles','cssmin:nocover','distpath']);

  
  // Register build task
  grunt.registerTask('build', ['stripfrontmatter','bakehtml','generatecritical']);

};