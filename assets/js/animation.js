$(function(){
    
    // Only animate elements when using non-mobile devices    
    if (jQuery.browser.mobile === false) 
    {
        /*---------------------------------------*/
        /*  INTRO SECTION
        /*---------------------------------------*/
        $('#intro > .intro-body .intro-content').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated bounceIn').css('opacity', 1);}
        });
        
        
        /*---------------------------------------*/
        /*  WHO WE ARE SECTION
        /*---------------------------------------*/
        $('#who-we-are #carousel-who-we-are').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInUp delayp1').css('opacity', 1);}
        });
        
        $('#who-we-are .who-we-are-text').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInUp delayp3').css('opacity', 1);}
        });
        
        
        /*---------------------------------------*/
        /*  OUR MAIN SKILLS SECTION
        /*---------------------------------------*/
        $('#our-main-skills .bar-chart-text').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated flipInX delayp1').css('opacity', 1);}
        });
        
        
        /*---------------------------------------*/
        /*  QUOTE SECTION
        /*---------------------------------------*/
        $('#quote .quote-text > .quote-icon').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInUp delayp1').css('opacity', 1);}
        });

        $('#quote .quote-text > h2').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInUp delayp3').css('opacity', 1);}
        });
        
        $('#quote .quote-text > h2.quote-by').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInUp delayp5').css('opacity', 1);}
        });
        
        
        /*---------------------------------------*/
        /*  KEEP IN TOUCH SECTION
        /*---------------------------------------*/
        $('#keep-in-touch .social-icon-item').each(function(i){            
            var element = $(this),
            itemsDelay   = ( isNaN($(this).data('animation-delay')) ? 50 : $(this).data('animation-delay'));
            element.css('opacity', 0).one('inview', function(isInView) {
                if (isInView){
                    setTimeout(function(){
                        element.addClass('animated bounceIn').css('opacity', 1);
                    } , itemsDelay * (i * 2));
                }
            });
        });
        
        
        /*---------------------------------------*/
        /*  MEET THE TEAM SECTION
        /*---------------------------------------*/
        $('#meet-the-team .team-item > .team-element').each(function(i){            
            var element = $(this),
            itemsDelay   = ( isNaN($(this).data('animation-delay')) ? 50 : $(this).data('animation-delay'));
            element.css('opacity', 0).one('inview', function(isInView) {
                if (isInView){
                    setTimeout(function(){
                        element.addClass('animated fadeInUp').css('opacity', 1);
                    } , itemsDelay * (i * 2));
                }
            });
        });
        
        
        /*---------------------------------------*/
        /*  TESTIMONIALS SECTION
        /*---------------------------------------*/
        $('#testimonials .testimonial-item').each(function(i){            
            var element = $(this),
            itemsDelay   = ( isNaN($(this).data('animation-delay')) ? 100 : $(this).data('animation-delay'));
            element.css('opacity', 0).one('inview', function(isInView) {
                if (isInView){
                    setTimeout(function(){
                        element.addClass('animated fadeInLeft').css('opacity', 1);
                    } , itemsDelay * (i * 2));
                }
            });
        });
        
       
        /*---------------------------------------*/
        /*  COMING SOON SECTION
        /*---------------------------------------*/        
        $('#coming-soon .countdown-form').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInUp delayp3').css('opacity', 1);}
        });
        
        $('#coming-soon .countdown-text').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInUp delayp5').css('opacity', 1);}
        });
        
       
        /*---------------------------------------*/
        /*  CONTACT US SECTION
        /*---------------------------------------*/
        $('#contact-us .contact-us-form').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInUp delayp1').css('opacity', 1);}
        });
        
        $('#contact-us .social-icon-text').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInUp delayp3').css('opacity', 1);}
        });
        
        
        /*---------------------------------------*/
        /*  MAP
        /*---------------------------------------*/        
        $('#cd-google-map').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated flipInX').css('opacity', 1);}
        });
        
       
        /*---------------------------------------*/
        /*  FOOTER
        /*---------------------------------------*/
        $('#footer .footer-column').each(function(i){            
            var element = $(this),
            itemsDelay   = ( isNaN($(this).data('animation-delay')) ? 50 : $(this).data('animation-delay'));
            element.css('opacity', 0).one('inview', function(isInView) {
                if (isInView){
                    setTimeout(function(){
                        element.addClass('animated fadeInUp').css('opacity', 1);
                    } , itemsDelay * (i * 2));
                }
            });
        });
    }
});