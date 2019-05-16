$(function(){
    if (jQuery.browser.mobile === false){
        $('.counter-item').one('inview', function(isInView){
            if (isInView){
                $('.inner-content > .number').countTo();
            }
        });
    }
});