( function($) {
	$(document).ready(function(){

		//uxtest
		if($('body.page-node-65').length){
			$('body.page-node-65 .breadcrumb a:eq(0)').text('Aller sur le site de Uservalue');
			$('body.page-node-65 .breadcrumb a:eq(1)').remove();
			$('body.page-node-65 .breadcrumb').click(function(){
				document.location.href="/";
			});
		}

		if($('body.new-page-type').length){
			$('body.new-page-type .breadcrumb a:eq(0)').text('Aller sur le site de Uservalue');
			$('body.new-page-type .breadcrumb a:eq(1)').remove();
			$('body.new-page-type .breadcrumb').click(function(){
				document.location.href=$('a.homebase').attr('href');
			});
		}


		if($('body.page-node-66').length){
			$('body.page-node-66 .breadcrumb a:eq(0)').text('Aller sur le site de Uservalue');
			$('body.page-node-66 .breadcrumb a:eq(1)').remove();
			$('body.page-node-66 .breadcrumb').click(function(){
				document.location.href="/";
			});
		}


		$(".bouton-remonter").click(function(){
			document.location.hash="#home";
		});
 
 
 

		  $('a[href*=#]').click(function() {
			
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
		    && location.hostname == this.hostname) {
		      var $target = $(this.hash);
		      $target = $target.length && $target
		      || $('[name=' + this.hash.slice(1) +']');
		      if ($target.length) {		
				var w = $(document).width();
				if(w<481){
					var sup = 68;	
				}
				else {
					if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
						var sup = 138;
					}
					else {
						var sup = 108;
					}
				}
		        var targetOffset = $target.offset().top-sup;
				//var $fixedElement = $('#nav');
				//$fixedElement.css({ "position": "relative" });
		        $('html,body')
				.animate({scrollTop: targetOffset}, "slow", function(){
					//console.log("test");
					//$fixedElement.css({ "position": "fixed" });
				});
				//console.log(targetOffset);
		       return false;
		      }
			else {
				if(this.hash!=""){
					document.location.href='/'+this.hash+'';
				}
				else {								
					$(".alert").fadeOut();
				}
				return false;
		   }
		  }
		     
  		}); 

		/* resize
		$( window ).resize(function() {
			var w = $(document).width();
			if(w<481){
				console.log("test");
				ml = 480 - w;
				ml = 215 -ml;
				$("a.logo").css({'marginLeft':''+ml+'px'});
			}
		});*/

		// rabat le menu
		$(".btn-navbar").addClass("collapsed");
		$(".nav-collapse .block-content a").click(function(){
			$(".btn-navbar").addClass("collapsed");
			$(".nav-collapse").removeClass("in");
			$(".nav-collapse").css({'height':'0'});		
			
		});

		// hack ie
		 $(".pointscles ul li:eq(0)").addClass("firstchild");
		 $(".pointscles ul li:eq(2)").addClass("lastchild");
		

		$(".nav-collapse .block-content li").hover(function(){
			//$(".nav-collapse .block-content li").removeClass("active");
		},function(){

		});


		/**/
		// TOUCH IOS
		if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
   

		$('a').not('.lienpartenaire,.contextual-links-wrapper a,a.btn.btn-navbar').on('click touchend', function(e) {

				var el = $(this);
				var link = el.attr('href');			
				$(".btn-navbar").addClass("collapsed");
				$(".nav-collapse").removeClass("in");
				$(".nav-collapse").css({'height':'0'});
				//alert(link);

	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
		    && location.hostname == this.hostname) {
		      var $target = $(this.hash);
		      $target = $target.length && $target
		      || $('[name=' + this.hash.slice(1) +']');
		      if ($target.length) {		
				var w = $(document).width();
				if(w<481){
					var sup = 48;	
				}
				else {
					if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
						var sup = 138;
					}
					else {
						var sup = 108;
					}
				}
		        var targetOffset = $target.offset().top-sup;
				//var $fixedElement = $('#nav');
				//$fixedElement.css({ "position": "relative" });
		        $('html,body')
				.animate({scrollTop: targetOffset}, "slow", function(){
					//console.log("test");
					//$fixedElement.css({ "position": "fixed" });
				});
				//console.log(targetOffset);
		       return false;
		      }
			else {
				if(this.hash!=""){
					document.location.href='/'+this.hash+'';
				}
				else {								
					$(".alert").fadeOut();
				}
				return false;
		   }
		  }

				/*if(link!=undefined){
				window.location = link;
				}*/
				
			});

			
			//alert("test");

		}

		if(navigator.userAgent.match(/(iPod|iPad)/)){
			$("#block-block-1 span.tel").css({'marginTop':'0'});
			$("#block-block-1 a.tel").css({'marginTop':'0'});
		}
		
 
		// Détection des navigateurs 
		// if ($.browser.safari) { } // safari
		// if ($.browser.msie && $.browser.version > 6 )) { } // IE6 and over
		// if ($.browser.msie && $.browser.version <= 6 )) { } // IE6 and below
		// if ($.browser.mozilla && $.browser.version >= '1.8' ))  { } // FireFox 2 and above

    //$("ul.nav a").focus(function(){  $(this).addClass("focus");});
    //$("ul.nav a").blur(function(){  $(this).removeClass("focus");});

		// Désactivation du clic droit
		// $(document).bind('contextmenu',function(e){ return false; });  

		// Désactive les outlines sur les boutons submit
		$("input[type=submit]").focus(function(){ $(this).blur(); });

		/*$(window).resize(function(){
			if ($(window).width() < $('.content').width()){
				$('.container').css('position', 'static');
			}
			else{
				$('.container').css('position', 'fixed');
			}
		});*/
	});
}) ( jQuery );