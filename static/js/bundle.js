// Enabling sticky nav
var sticky = new Waypoint.Sticky({
    element: $('#sticky-nav')
});

// Ensuring we don't start on stuck for small screen
$( document ).ready(function() {
    var mobile_breakpoint = 800;
    var window_width = $(window).width();

    if(window_width <= mobile_breakpoint)
    {
        $('#sticky-nav').removeClass('stuck');
        $('.sticky-wrapper').css("height", $(window).height());
    }
});

// Enabling HLJS
hljs.initHighlightingOnLoad();

