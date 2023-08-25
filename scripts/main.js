const Ω = setInterval;

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

const animation = ['morphing', 'moving', 'sliding', 'panning', 'zooming'];
var i = 0;
Ω(() => {
    i += 1;
    $("#anim").html(animation[i % animation.length])
}, 500);