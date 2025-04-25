const applyStyles = (element) => (styles) => {
    Object.keys(styles).forEach(key => {
        element.style[key] = styles[key];
    });
};

function applyStyle(element, style) {
    if (element && style) {
        for (var prop in style) {
            if (style.hasOwnProperty(prop)) {
                element.style[prop] = style[prop];
            }
        }
    }
}

function Box(parent, x, y, height, width, className) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
    this.width = height ? height : 0;
    this.height = width ? width : 0;
    this.className = className ? className : 'box';
    this.element = document.createElement('div');
    this.element.classList.add(this.className);
    parent.appendChild(this.element);
    this.applyStyles = applyStyles(this.element);

    this.draw = function() {
       const style = {
           left: this.x + 'px',
           top: this.y + 'px',
           width: this.width ? this.width + 'px' : 'initial',
           height: this.height ? this.height + 'px' : 'initial'
       };
       this.applyStyles(style);
    };
}

function randomHeight() {
    return Math.round(Math.random() * 300);
}

function Pole(parent, x) {
    this.x = x ? x : 400; // Initial X position
    this.y = 0;
    this.height = randomHeight();
    this.width = 60;
    this.element = document.createElement('div');
    this.element.classList.add('pole');
    parent.appendChild(this.element);

    const style = {
        height: this.height + "px",
        width: this.width + 'px',
        background: 'green',
        position: 'absolute',
        top: this.y + 'px',
        left: this.x + 'px'
    };
    applyStyle(this.element, style);

    this.moveLeft = function(speed) {
        this.x -= speed;
        if (this.x + this.width < 0) {
            this.x = parent.offsetWidth;
            this.height = randomHeight();
            this.element.style.height = this.height + 'px';
        }
        this.element.style.left = this.x + 'px';
    };
}

function Bird(app) {
    this.x = 100;
    this.y = 100;
    this.acc = 2; 
    this.width = 37;
    this.height = 57;
    this.className = 'bird';
    Box.call(this, app, this.x, this.y, this.height, this.width, this.className);
    this.draw();

    this.move = function() {
        this.y += 1 * this.acc;
        this.element.style.transform = 'rotate(60deg)';
        this.draw();
    };

    addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            this.y -= 50;
            this.element.style.transform = 'rotate(-30deg)';
        }
    });
}

Object.setPrototypeOf(Bird.prototype, Box.prototype);

;(function() {
    var app = document.getElementById('app');
    var bird = new Bird(app);
    var wrapper = document.getElementsByClassName('wrapper')[0];
    let marginLeft = 0;
    var poles = [new Pole(app, 400), new Pole(app, 600)];

    let run = setInterval(() => {
        bird.move();

        poles.forEach(pole => pole.moveLeft(3));

        if (bird.y >= wrapper.clientHeight - 240 || bird.y <= 0) {
            console.log('Game Over');
            clearInterval(run);
        }

        marginLeft -= 3;
        wrapper.style.marginLeft = marginLeft + 'px';

    }, 20);
})();