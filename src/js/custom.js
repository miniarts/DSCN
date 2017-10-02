/*
    author : kaori
    
    re-wrote everything but not sure about some logic and left it as it was
    edit this file and compile/minimise it
*/

(function($, window) {
    var ns = window.app || {},
        app = { 
 
            init: function () {
                "use strict";
     
                $(document).ready(function () { 

                    app.wechatSocial();
                    app.burgerIcon();
                    app.setDrawer();
                    app.backToTop();
                    
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
                        $wrapper.removeClass('mobnav-closed');
                        $wrapper.addClass('mobnav-open');
                    } else {
                        $wrapper.addClass('mobnav-closed');
                        $wrapper.removeClass('mobnav-open');
                    }
                });
            },
            transitionDelay: function(el, speed){
                var docElemStyle = document.documentElement.style,
                    transitionProp = typeof docElemStyle.transition == 'string' ? 'transition' : 'WebkitTransition';

                    $.each(el, function(index){
                        $(this).css(transitionProp + 'Delay', index*speed + 'ms');
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
            backToTop: function(){
                var $backToTop = $('#back-to-top'),
                    $body = $("html, body");

                $backToTop.on('click', function(e){
                    e.preventDefault();

                    $body.stop().animate({scrollTop:0}, 500, 'swing');
                });
            },
            onDemandNav :function(){    
                //NOTE: modified to make it understandable but needs more work 
                var paused = false,
                    lastScrollTop = 0,
                    onLoaded = true,
                    $document = $(document),
                    $body = $('body'),
                    titleSticky = 0,
                    contentBottom = 0,
                    titleHeight = 0 ;
                

                var init = function(){
                        //only article/exhibitor page
                        if (($('html').hasClass('view-article')||$('html').hasClass('view-exhibitor')) && ($('.content-main .page-header').length == 1)) {
                            titleSticky = 1;
                            contentBottom = $('.content-main').height();
                            titleHeight = $('.content-main .page-header').outerHeight();
                        }
                    },
                    onDemand = function(){ 
    
                    if ($('.t3-wrapper').hasClass('mobnav-open')) {
                        //drawer opened - don't do anything
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
                      $body.addClass('scrolled');
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

                init();
                $(window).on('scroll', function() {
                    init()
                    onDemand();
                });
                $(window).on('orientationchange', function() {
                    init();
                });
            }
        };
  
    app.cache = ns.cache || {};
     
    app.init($); // initialises the calls
     
    window.app = $.extend(ns, app);
}) (jQuery, window);