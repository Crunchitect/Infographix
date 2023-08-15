function checkElementLocation() {
    var $window = $(window);
    var bottom_of_window = $window.scrollTop() + $window.height();

$('.elem').each(function(i) {
    var $obj = $(this);
    var bottom_of_object = $obj.position().top + $obj.outerHeight();

    //if element is in viewport, add the animate class
    if (bottom_of_window > bottom_of_object) {
        $(this).addClass('fade-in');
    }
});
}
// if in viewport, show the animation
checkElementLocation();

$(window).on('scroll', function() {
    checkElementLocation();
});