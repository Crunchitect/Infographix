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

const path = document.querySelector("path");
const length = path.getTotalLength();
const cursors = document.getElementsByClassName("js-cursor")
const notnow = Date.now();

const svg = document.getElementById("svg");
// console.log(width, height);
// console.log(svg.getBBox());

const update = () => {
    const { left, top, right, bottom } = svg.getBoundingClientRect();
    const { width, height } = svg.getBBox();
    const elem_width = right - left;
    const elem_height = top - bottom;

    const seconds_passed = ((Date.now() - notnow) / 1000);
    const anime_frame = seconds_passed * 15 % length;
    [].slice.call(cursors).forEach(
        (item, index) => {
            const {x, y} = path.getPointAtLength((anime_frame + index * 15) % length);
            const x_real = x / width * elem_width;
            const y_real = -y / height * elem_height;
            item.style.top = (y_real).toString() + "px";
            item.style.left = (x_real).toString() + "px";
            // console.log(x, y, item,)
        }
    );
    requestAnimationFrame(update);
}

requestAnimationFrame(update);
