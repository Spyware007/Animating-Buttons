document.addEventListener('DOMContentLoaded', function () {
    var container = document.querySelector('body');
    var element = document.querySelector('.btn');

    var cursor = document.createElement('div');
    cursor.classList.add('cursor');
    cursor.innerHTML = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><polygon fill="#FFFFFF" points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6 "/><polygon fill="#FFFFFF" points="17.3,21.6 13.7,23.1 9,12 12.7,10.5 "/><rect x="12.5" y="13.6" transform="matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)" width="2" height="8"/><polygon points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5 "/></svg>';
    container.appendChild(cursor);

    container.style.cursor = 'none';

    document.addEventListener('mousemove', function (e) {
        cursor.style.display = e.target === container ? 'block' : 'none';
        cursor.style.setProperty('--x', e.pageX + 'px');
        cursor.style.setProperty('--y', e.pageY + 'px');
        cursor.style.setProperty('--r', calculateRotate(cursor, element) + 20 + 'deg');
    });

    container.addEventListener('mouseleave', function () {
        cursor.style.display = 'none';
    });

    function calculateRotate(elem, to) {
        var offset = elem.getBoundingClientRect();
        var toOffset = to.getBoundingClientRect();
        var center = {
            x: offset.left + elem.offsetWidth / 2,
            y: offset.top + elem.offsetHeight / 2
        };
        var toCenter = {
            x: toOffset.left + to.offsetWidth / 2,
            y: toOffset.top + to.offsetHeight / 2
        };
        var radians = Math.atan2(toCenter.x - center.x, toCenter.y - center.y);
        var degree = (radians * (180 / Math.PI) * -1) + 180;
        return degree;
    }

    element.addEventListener('click', function (e) {
        e.preventDefault();
        return false;
    });
});
