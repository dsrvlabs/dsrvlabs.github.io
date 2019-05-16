$(function(){
    var skills = function (){
        $('.bar-chart .bar-chart-item').each(function(){
            newWidth = $(this).parent().width() * ($(this).data('percent') / 100);

            $(this).width(0).animate({
                width: newWidth
            }, 1500);
        }); 
    };
    
    if (jQuery.browser.mobile === false){
        $('.bar-chart').one('inview', function(isInView){
            if (isInView) {
                skills();
            }
        });
    }
    else {
        skills();
    }
    
    $(window).smartresize(function(){
        skills();
    });
});