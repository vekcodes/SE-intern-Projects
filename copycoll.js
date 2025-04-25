function applyStyle(element, style) {
    if (element && style) {
        for (var prop in style) {
            if (style.hasOwnProperty(prop)) {
                element.style[prop] = style[prop];
            }
        }
    }
    else {
        console.log('no style or element')
    }
}
function dxdy() {
    return Math.random() * 2 - 1;
}
function randomRange(appStartx, appStopy, appHeight, appWidth) {
    return {
        x: Math.random() * (appWidth - 10) + appStartx,
        y: Math.random() * (appHeight - 10) + appStopy
    }
}
function randomColor() {
    var color = ['blue', 'red', 'purple', 'green', 'brown', 'cyan', 'black', 'yellow', 'orange']
    let index = Math.round(Math.random() * 8)
    return color[index];
}
function Box(parentRef, dx, dy) {
    let randomPosition = randomRange(parentRef.style.left, parentRef.style.top, parentRef.clientHeight, parentRef.clientWidth);
    this.x = +randomPosition.x
    this.y = +randomPosition.y
    this.dx = +dxdy()
    this.dy = +dxdy()
    this.height = 10;
    this.width = 10;
    this.color = randomColor()
    this.element = document.createElement('div')
    applyStyle(
        this.element, {
        position: 'absolute',
        top: this.y + 'px',
        left: this.x + 'px',
        backgroundColor: this.color,
        height: this.height + 'px',
        width: this.width + 'px'
    }
    )

    parentRef.appendChild(this.element);
    this.move = function () {

    }

}

(function () {
    var app = document.getElementById('app');
    var speed = 10;
    applyStyle(app, {
        border: '1px solid red',
        height: '400px',
        width: '400px',
        margin: '0 auto',
        marginTop: '50px',
        position: 'relative',
    });
    let boxes = [];
    for (let i = 0; i < 100; i++) {
        boxes.push(new Box(app));
    }
    setInterval(() => {
        boxes.forEach(box => {
            box.move();
        })
    }, speed)
})();