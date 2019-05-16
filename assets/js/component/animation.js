$(function(){
    
    // Only animate elements when using non-mobile devices    
    if (jQuery.browser.mobile === false) 
    {
        /*---------------------------------------*/
        /*  BAR CHART
        /*---------------------------------------*/
        $('.bar-chart').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated flipInX delayp1').css('opacity', 1);}
        });
        
        
        /*---------------------------------------*/
        /*  CONTENT BOXES
        /*---------------------------------------*/
        $('.content-boxes').each(function(i){            
            var element = $(this),
            itemsDelay   = ( isNaN($(this).data('animation-delay')) ? 10 : $(this).data('animation-delay'));
            element.css('opacity', 0).one('inview', function(isInView) {
                if (isInView){
                    setTimeout(function(){
                        element.addClass('animated flipInY').css('opacity', 1);
                    } , itemsDelay * (i * 2));
                }
            });
        });
        
        
        /*---------------------------------------*/
        /*  COUNTERS
        /*---------------------------------------*/
        $('.counter-item > i').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInUp delayp1').css('opacity', 1);}
        });
        
        $('.counter-item > .inner-content').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInUp delayp3').css('opacity', 1);}
        });
        
        $('.counter-item > p').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInUp delayp5').css('opacity', 1);}
        });
        
        
        /*---------------------------------------*/
        /*  FUNNY BOXES
        /*---------------------------------------*/
        $('.funny-boxes-text').each(function(i){            
            var element = $(this),
            itemsDelay   = ( isNaN($(this).data('animation-delay')) ? 10 : $(this).data('animation-delay'));
            element.css('opacity', 0).one('inview', function(isInView) {
                if (isInView)
                {
                    setTimeout(function(){
                        element.addClass('animated flipInY').css('opacity', 1);
                    } , itemsDelay * (i * 4));
                }
            });
        });
        
        
        /*---------------------------------------*/
        /*  PIE CHART
        /*---------------------------------------*/
        $('.pie-chart-item').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInUp delayp1').css('opacity', 1);}
        });
        
        
        /*---------------------------------------*/
        /*  PORTFOLIO
        /*---------------------------------------*/
        $('.portfolio-item > .inner-content').each(function(i){            
            var element = $(this),
            itemsDelay   = ( isNaN($(this).data('animation-delay')) ? 50 : $(this).data('animation-delay'));
            element.css('opacity', 0).one('inview', function(isInView) {
                if (isInView){
                    setTimeout(function(){
                        element.addClass('animated bounceIn').css('opacity', 1);
                    } , itemsDelay * i);
                }
            });
        });
        
        
        /*---------------------------------------*/
        /*  PRICING TABLES
        /*---------------------------------------*/
        $('.pricing-table .pricing-wrapper').each(function(i){            
            var element = $(this),
            itemsDelay   = ( isNaN($(this).data('animation-delay')) ? 15 : $(this).data('animation-delay'));
            element.css('opacity', 0).one('inview', function(isInView) {
                if (isInView){
                    setTimeout(function(){
                        element.addClass('animated bounceInUp').css('opacity', 1);
                    } , itemsDelay * (i * 2));
                }
            });
        });
        
        
        /*---------------------------------------*/
        /*  TIMELINE
        /*---------------------------------------*/
        $('ul.timeline > li > .timeline-panel').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInLeft').css('opacity', 1);}
        });

        $('ul.timeline > li.timeline-inverted > .timeline-panel').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInRight').css('opacity', 1);}
        });
    }
});