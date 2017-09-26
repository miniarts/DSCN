(function($) {
	
var $window = $(window);
	
var isMobile = false;

var isTablet = false;

var isMobNavOpen = false;

$(document).ready(function() {

function checkWidth() {
    var windowsize = $window.width();
    if (windowsize <= 991) {
		isMobile = true;
    	isTablet = true; 
    } else if (windowsize <= 1179) {
    	isMobile = false;
		isTablet = true;
    } else {
	    isMobile = false;
	    isTablet = false;
    }
}

checkWidth();

$(window).resize(checkWidth);

			
		
function constructMenuLinks(){
	var li = $(".mob-nav li");
	var height = ($('.navbar-inner').height() - 110)/ li.length;
	li.css("line-height", height + "px"); 
}

constructMenuLinks();

$( window ).on( "orientationchange", function( event ) { 
	constructMenuLinks();
});

$(window).resize(constructMenuLinks);

$('#mob-navbar-btn').click(function() {
	if ($('.t3-wrapper').hasClass('mobnav-closed')) {
		isMobNavOpen = true;
		$('.t3-wrapper').toggleClass('mobnav-closed');
		$('.t3-wrapper').toggleClass('mobnav-open');
	} else {
		isMobNavOpen = false;
		$('.t3-wrapper').toggleClass('mobnav-closed');
		$('.t3-wrapper').toggleClass('mobnav-open');
	}
});


var items = $('#mob-navbar .navbar-inner .navbar-nav > li');

// get vendor transition property
var docElemStyle = document.documentElement.style;
var transitionProp = typeof docElemStyle.transition == 'string' ?
    'transition' : 'WebkitTransition';

	for ( var i=0; i < items.length; i++ ) {
	    var item = items[i];
	    // stagger transition with transitionDelay
	    item.style[ transitionProp + 'Delay' ] = ( i * 25 ) + 'ms';
	}		
	
var $wechatSocial = $('#socialicons .foundicon-torso').parent('a');

$($wechatSocial).on("hover", function(){
    	wechatQR(this);
});
$($wechatSocial).on("click", function(event){
		event.preventDefault();
});

function wechatQR(wechatbtn) {
	if ($(wechatbtn).hasClass('qr-on')) {
		$(wechatbtn).removeClass('qr-on');
		$(wechatbtn).children('.wechatQR').remove();
	} else {
		$(wechatbtn).addClass('qr-on');
		$(wechatbtn).append("<div class='wechatQR'><img src='/images/system/wechat-qr-V2.png'></div>").fadeIn();
	}
}
				
});




var paused = false;

var lastScrollTop = 0;

var onLoaded = true;

// Detect IE version
var iev=0;
var ieold = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
var trident = !!navigator.userAgent.match(/Trident\/7.0/);
var rv=navigator.userAgent.indexOf("rv:11.0");

if (ieold) iev=new Number(RegExp.$1);
if (navigator.appVersion.indexOf("MSIE 10") != -1) iev=10;
if (trident&&rv!=-1) iev=11;

$(window).on('load', function() {
	var $body = $('body');
	var titleSticky = 0;
	if ($('html').hasClass('view-article') && ($('.content-main .page-header').length == 1)) {
		titleSticky = 1;
		var contentBottom = $('.content-main').height();
		var titleHeight = $('.content-main .page-header').outerHeight();
	}
	
	// Firefox or IE 11
	if(typeof InstallTrigger !== 'undefined' || iev == 11) {
	    
	    $(window).on('scroll', function() {
		    if (isMobNavOpen === true) {
			    return false;
		    }
	        st = $(this).scrollTop();	
	        		    
	        if (onLoaded === true || st <= 100) {
				onLoaded = false;
				$body.removeClass('headerHide');
				$body.removeClass('scrolled');
				return false;
			} else {
				if (isMobile === false) {
					$body.addClass('scrolled');
				}
			}
			
			if (titleSticky == 1) {
				tt = $('.content-main .page-header').offset().top + titleHeight;
			    if (tt > contentBottom) {
				    titleHide();
			    } else {
				    titleShow();
			    }
		    }
			
	        if(st < lastScrollTop) {
	            if( paused ){
		            headerShow();
		            paused = false;
		        }  
	        }
	        else if(st > lastScrollTop) {
	            if( !paused ){
		            headerHide();
		            paused = true;
		        }
	        }
	        lastScrollTop = st;
	    });
	} 
	// Other browsers
	else {
	    $(window).scroll(function(){	
		    if (isMobNavOpen === true) {
			    return false;
		    }
		    var st = $(this).scrollTop();	    
		    
			if (onLoaded === true || st <= 100) {
				onLoaded = false;
				$body.removeClass('headerHide');
				$body.removeClass('scrolled');
				titleShow();
				return false;
			} else {
				if (isMobile === false) {
					$body.addClass('scrolled');
				}
			}

		    if (titleSticky == 1) {
			    var tt = $('.content-main .page-header').offset().top + titleHeight;
			    if (tt > contentBottom) {
				    titleHide();
			    } else {
				    titleShow();
			    }
		    }
		    
		    if( st < lastScrollTop ) {
		         if( paused ){
		            headerShow();
		            paused = false;
		        }       
		    } else {
		        if( !paused ){
		            headerHide();
		            paused = true;
		        }
		    }		    
		    lastScrollTop = st;
		});
		
	}
	
	function headerHide() {	
		$body.removeClass('headerShow');
		$body.addClass('headerHide');
	}
	function headerShow()  {
		$body.removeClass('headerHide');
		$body.addClass('headerShow');
	}
	function titleHide() {
		$('.content-main .page-header').css({'opacity':'0'});
	}
	function titleShow() {
		$('.content-main .page-header').css({'opacity':'1'});
	}
});

})( jQuery );
