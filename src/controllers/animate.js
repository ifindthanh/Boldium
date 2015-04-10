function animate(duration, cb) {
    var start = new Date().getTime();

    function step() {
        var now = new Date().getTime();
        cb(Math.min(now - start, duration));
        if (now < start + duration) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

// t = current time
// b = start value
// c = change in value
// d = duration
animate.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) {
        return c / 2 * t * t + b;
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};


module.exports = animate;
