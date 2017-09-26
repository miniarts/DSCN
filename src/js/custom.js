/*
    author: kaori
	

    edit this file and compile/minimise it
*/

(function($, window) {
    var ns = window.app || {},
        app = { 
 
        init: function () {
            "use strict";
 
            $(document).ready(function () { 
                // var isMobile = { //NOT USED
                //     Android: function() {
                //         return navigator.userAgent.match(/Android/i);
                //     },
                //     BlackBerry: function() {
                //         return navigator.userAgent.match(/BlackBerry/i);
                //     },
                //     iOS: function() {
                //         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                //     },
                //     Opera: function() {
                //         return navigator.userAgent.match(/Opera Mini/i);
                //     },
                //     Windows: function() {
                //         return navigator.userAgent.match(/IEMobile/i);
                //     },
                //     any: function() {
                //         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                //     }
                // };
                 
                // if(!isMobile.any()){
                // }else{
                //     //desktop onlhy
                // }

                app.wechatSocial();
                app.burgerIcon();
                app.setDrawer();
               	
            });
            $(window).on('load', function() {
				app.onDemandNav();
            });
 
            return false;
        },
        wechatQR: function(wechatbtn) {
            if ($(wechatbtn).hasClass('qr-on')) {
                $(wechatbtn).removeClass('qr-on');
                $(wechatbtn).children('.wechatQR').remove();
            } else {
                $(wechatbtn).addClass('qr-on');
                $(wechatbtn).append("<div class='wechatQR'><img src='/images/system/wechat-qr-V2.png'></div>").fadeIn();
            }
        },
        wechatSocial: function(){
            var $wechatSocial = $('#socialicons .foundicon-torso').parent('a');

            $($wechatSocial).on("click", function(event){
                    event.preventDefault();
                    app.wechatQR(this);
            });
        },
        burgerIcon: function(){
            var $btn = $('#mob-navbar-btn'),
                $wrapper = $('.t3-wrapper');

            $btn.on('click', function() {
                if ($wrapper.hasClass('mobnav-closed')) {
                    //isMobNavOpen = true;
                    $wrapper.removeClass('mobnav-closed');
                    $wrapper.addClass('mobnav-open');
                } else {
                    //isMobNavOpen = false;
                    $wrapper.addClass('mobnav-closed');
                    $wrapper.removeClass('mobnav-open');
                }
            });
        },
        transitionDelay: function(el, speed){
            var docElemStyle = document.documentElement.style,
                transitionProp = typeof docElemStyle.transition == 'string' ? 'transition' : 'WebkitTransition';

                $.each(el, function(){
                    $(this).css(transitionProp + 'Delay', i*speed + 'ms');
                });      
        },
        
        setDrawer: function(){
            var $items = $('#mob-navbar .navbar-inner .navbar-nav > li');
            var height = ($('.navbar-inner').height() - 110)/ $items.length;
            	//set the line-height, not sure about the -110 but copied from the old one

            var setLineHeight = function(){
	            $.each($items, function(){
	               $(this).css("line-height", height + "px"); 
	            });    
        	};

            app.transitionDelay($items, 25);
           	setLineHeight();

            $(window).on( "orientationchange", setLineHeight);

            $(window).resize(setLineHeight);

        },
        scrollToTop: function(){
            $("#back-to-top").click(function (e) {
                e.preventDefault();
                $("html, body").animate({scrollTop: 0}, 500);
            });
        },
		onDemandNav :function(){    
			//NOTE: modified to make it understandable but needs more work 
			var paused = false,
				lastScrollTop = 0,
				onLoaded = true,
				$document = $(document),
				$window = $(window),
				$body = $('body'),
				titleSticky = 0,
				contentBottom = 0,
				titleHeight = 0 ;

			// Detect IE version
			var iev=0;
			var ieold = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
			var trident = !!navigator.userAgent.match(/Trident\/7.0/);
			var rv=navigator.userAgent.indexOf("rv:11.0");

			if (ieold) iev=new Number(RegExp.$1);
			if (navigator.appVersion.indexOf("MSIE 10") != -1) iev=10;
			if (trident&&rv!=-1) iev=11;
			
   			//only article page
		    if ($('html').hasClass('view-article') && ($('.content-main .page-header').length == 1)) {
		        titleSticky = 1;
		        contentBottom = $('.content-main').height();
		        titleHeight = $('.content-main .page-header').outerHeight();
		    }

			var onDemand = function(){ 
				//drawer opened - don't do anything
				if ($('.t3-wrapper').hasClass('mobnav-open')) {
		            return false;
		        }

		        var st = $document.scrollTop();     

		        if (onLoaded === true || st <= 100) {
		            onLoaded = false;
		            $body.removeClass('headerHide');
		            $body.removeClass('scrolled');
		            $('.content-main .page-header').css({'opacity':'1'});
		            return false;
		        } else { 
		            if ($window.width() > 991) {
		                $body.addClass('scrolled');
		            }
		        }

		        if (titleSticky == 1) {
		            var tt = $('.content-main .page-header').offset().top + titleHeight;
		            if (tt > contentBottom) {
		                $('.content-main .page-header').css({'opacity':'0'});
		            } else {
		                $('.content-main .page-header').css({'opacity':'1'});
		            }
		        }

		        if( st < lastScrollTop ) {
		             if(paused){
		                $body.removeClass('headerHide');
		                paused = false;
		            }       
		        } else {
		            if( !paused ){
		                $body.addClass('headerHide');
		                paused = true;
		            }
		        }           
		        lastScrollTop = st;
			}

		// Firefox or IE 11
		if(typeof InstallTrigger !== 'undefined' || iev == 11) {
		    $(window).on('scroll', function() {
		    	onDemand();
			});
		}else{
			$(window).scroll(onDemand);
		}
    },



    //     onDemandNav: function(){
    //     	var $body = $('body'),
    //         lastScrollTop,
    //         scrollTop,
    //         $window = $(window),
    //         $document = $(document),
 
    //         init = function(){
    //         	lastScrollTop = 0;
    //         	scrollTop = 0;
    //         	$body.removeClass('headerHide');
    //         },
 
    //         scrollNav = function(){
    //             scrollTop = $document.scrollTop();
 
    //             if(lastScrollTop > scrollTop){//up
    //             	$body.removeClass('headerHide');
    //             }else{//down
    //             	$body.addClass('headerHide');
    //             }
    //             lastScrollTop = scrollTop;
    //         };
 			
 			// //if($window.width() > 991){
		  //       // $window.resize(function(){
		  //       //     init();
		  //       //     scrollNav();
		  //       // });
		 
		  //       $window.scroll(function(){ console.log('scroll')
		  //           scrollNav();
		  //       });
		 
		  //       init();
		  //  // / }
    //     },
        
        //set boxes in equal size - not used
        // setHeight : function(el){
        //     var maxHeight = 0;
 
        //     $(el).css({
        //         'height':''
        //     });
 
        //     $(el).each(function() {
        //         maxHeight = maxHeight > $(this).outerHeight() ? maxHeight : $(this).outerHeight();
        //     });
             
        //     $(el).height(maxHeight);    
        //     return false;       
        // },
        // heightFix : function(){
        //     if($('.img-thumbnail').length){              
        //         $(window).resize(function(){ 
        //            app.setHeight($('.img-thumbnail'));
        //         }); 
 
        //         $(window).trigger('resize');
        //     }
        // }
    };
  
    app.cache = ns.cache || {};
     
    app.init($); // initialises the calls
     
    window.app = $.extend(ns, app);
}) (jQuery, window);