(function( $ ) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular smooth.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */
	//document ready
	$(function(){
	 
		$( ".wprs_rd_more" ).click(function() {
			$(this ).hide();
			$(this ).next("span").show(0, function() {
				// Animation complete.
				$(this ).css('opacity', '1.0');
			  });
			//$(this ).next("span").css('opacity', '1.0');
			
			//change height of wprev-slider-widget
			$(this ).closest( ".wprev-slider-widget" ).css( "height", "auto" );
			
			//change height of wprev-slider
			$(this ).closest( ".wprev-slider" ).css( "height", "auto" );
			
			
		});
		
		//check to see if we need to create slider;
			$( ".wprev-slider" ).each(function( index ) {
				createaslider(this,'shortcode');
			});
			$( ".wprev-slider-widget" ).each(function( index ) {
				createaslider(this,'widget');
			});
			function createaslider(thissliderdiv,type){
				//unhide other rows.
				var showarrows = true;
				if(type=='widget'){
					showarrows = false;
				}
				$( thissliderdiv ).find('li').show();
				var slider = $( thissliderdiv ).wprs_unslider(
						{
						autoplay:false,
						infinite:false,
						delay: '5000',
						speed: '750',
						animation: 'horizontal',
						arrows: showarrows,
						animateHeight: true,
						activeClass: 'wprs_unslider-active',
						}
					);
				
				setTimeout(function(){
					//height of active slide
					var firstheight = $(thissliderdiv).find('.wprs_unslider-active').height();
					$(thissliderdiv).css( 'height', firstheight );
				}, 500);
				
				//slider.on('mouseover', function() {slider.data('wprs_unslider').stop();}).on('mouseout', function() {slider.data('wprs_unslider').start();});
								
			};
			
		//simple tooltip for added elements and mobile devices
		$(".wptripadvisor_t1_outer_div").on('mouseenter touchstart', '.wprevtooltip', function(e) {
			var titleText = $(this).attr('data-wprevtooltip');
			$(this).data('tiptext', titleText).removeAttr('data-wprevtooltip');
			$('<p class="wprevpro_tooltip"></p>').text(titleText).appendTo('body').css('top', (e.pageY - 15) + 'px').css('left', (e.pageX + 10) + 'px').fadeIn('slow');
		});
		$(".wptripadvisor_t1_outer_div").on('mouseleave touchend', '.wprevtooltip', function(e) {
			$(this).attr('data-wprevtooltip', $(this).data('tiptext'));
			$('.wprevpro_tooltip').remove();
		});
		$(".wptripadvisor_t1_outer_div").on('mousemove', '.wprevtooltip', function(e) {
			$('.wprevpro_tooltip').css('top', (e.pageY - 15) + 'px').css('left', (e.pageX + 10) + 'px');
		});
		
		//going to search for media added to reviews and load lity if we find them.
		setTimeout(function(){ mediareviewpopup(); }, 500);
		function mediareviewpopup(){
			var mediadiv = $(".wprev_media_div");
			if(mediadiv.length){
				//make sure lity isn't loaded already in free google version.
				if(!isScriptAlreadyIncluded('wp-google-places-review-slider/public/js/wprev-public-com-min.js')){
					//load js and css files.
					$('<link/>', {
					   rel: 'stylesheet',
					   type: 'text/css',
					   href: wprevpublicjs_script_vars.wprevpluginsurl+"/public/css/lity.min.css"
					}).appendTo('head');
					$.getScript(wprevpublicjs_script_vars.wprevpluginsurl+"/public/js/lity.min.js", function() {
						//script is loaded and ran on document root.
					});
				}
			}
		}
		
		function isScriptAlreadyIncluded(src){
			var scripts = document.getElementsByTagName("script");
			var tempscriptname;
			for(var i = 0; i < scripts.length; i++){
				if(scripts[i].getAttribute('src')) {
					tempscriptname = scripts[i].getAttribute('src');
				   if(tempscriptname.includes(src)){
					   return true;
				   }
				}
			}
			return false;
		}

		
	});

})( jQuery );
