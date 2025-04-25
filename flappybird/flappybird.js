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
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.className = className || 'box';
    this.element = document.createElement('div');
    this.element.classList.add(this.className);
    parent.appendChild(this.element);
    this.applyStyles = applyStyles(this.element);

    this.draw = function() {
        this.applyStyles({
            left: this.x + 'px',
            top: this.y + 'px',
            width: this.width + 'px',
            height: this.height + 'px'
        });
    };
}

function randomHeight() {
    return Math.round(100 + Math.random() * 150);
}

function Pole(parent, isLower) {
    this.x = 300;
    this.width = 120;
    this.gap = 180;
    this.height = randomHeight();
    this.isLower = isLower;
    this.element = document.createElement('div');

    this.element.classList.add('pole');
    parent.appendChild(this.element);

    if (isLower) {
        this.y = 500 - this.height;
    } else {
        this.y = 0;
    }
    if(!isLower){
        applyStyle(this.element,{
            transform: 'rotate(180deg)'
        })
    }

    this.draw = function() {
        applyStyle(this.element, {
            height: this.height + 'px',
            width: this.width + 'px',
            left: this.x + 'px',
            top: this.y + 'px'
        });
    };

    this.move = function() {
        this.x -= 2;
        if (this.x < -this.width) {
            this.x = 300;
            this.height = randomHeight();
            this.y = isLower ? 500 - this.height : 0;
        }
        this.draw();
    };

    this.draw();
}

function Bird(app) {
    this.x = 100;
    this.y = 200;
    this.width = 50;
    this.height = 40;
    this.velocity = 0;
    this.gravity = 0.5;
    Box.call(this, app, this.x, this.y, this.height, this.width, 'bird');
    this.draw();

    this.move = function() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        this.draw();
    };

    addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            this.velocity = -7;
        }
    });
}

Object.setPrototypeOf(Bird.prototype, Box.prototype);

(function() {
    var app = document.getElementById('app');
    var wrapper = document.getElementsByClassName('wrapper')[0];      
    var bird = new Bird(app);
    var topPole = new Pole(app, false);
    var bottomPole = new Pole(app, true);
    var score = 0;
    var scoreDisplay = document.getElementById('score');

    let gameLoop = setInterval(() => {
        bird.move();
        topPole.move();
        bottomPole.move();
        
        // Fix pole gap calculations
        bottomPole.y = topPole.height + gap;
        bottomPole.draw();

        let birdBox = getBox(bird);
        let topBox = getBox(topPole);
        let bottomBox = getBox(bottomPole);

        if (detectCollision(birdBox, topBox) || detectCollision(birdBox, bottomBox) || bird.y >= wrapper.clientHeight - 40) {
            clearInterval(gameLoop);
            alert('Game Over! Score: ' + score);
        }

        if (bird.x > topPole.x + topPole.width && bird.x < topPole.x + topPole.width + 5) {
            score++;
            scoreDisplay.innerText = 'Score: ' + score;
        }
    }, 20);

    function detectCollision(bird, pole) {
        return (
            bird.x < pole.x + pole.width &&
            bird.x + bird.width > pole.x &&
            bird.y < pole.y + pole.height &&
            bird.y + bird.height > pole.y
        );
    }

    function getBox(obj) {
        return {
            x: obj.x,
            y: obj.y,
            width: obj.width,
            height: obj.height
        };
    }
})();
