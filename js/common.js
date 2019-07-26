$(document).ready(function(){

    $('.menu-burger').on('click',function(){
        var menu = $(".menu"),
            subMenu = $('.menu-content');
        if(!menu.hasClass('__active')){
            $('.main-username').addClass('hide-user');
            menu.addClass('__active',100).promise().done(function(){
                    
                subMenu.delay(800).queue(function() {
                $(this).addClass('__active');
                    $(this).dequeue();
                });

                $('.menu-burger').addClass('__active');

            });
        }
        else{
            $(".menu,.menu-content,.menu-burger").removeClass('__active',100)
            $('.main-username').removeClass('hide-user');       
        }
        
    });

    if($('.justify-gallery').length){
        $('.justify-gallery').justifiedGallery({
            lastRow : 'nojustify',
            margins : 3,
            rowHeight: 250
        });    
    }

    $(window).on('scroll',function(){
        if($('.instagram-heading > h1').hasClass('go')){
            $('.instagram-section').addClass('black-bg')
        }else{
            $('.instagram-section').removeClass('black-bg')
        }
    });

    $('.top-bottom-link').on("click",function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });

    $(window).on('scroll',function() {    
        var scroll = $(window).scrollTop();

        if (scroll >= 100) {
            $(".top-bottom-link").addClass("show-link");
        } else {
            $(".top-bottom-link").removeClass("show-link");
        }
    });

})