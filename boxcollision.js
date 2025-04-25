// IEFE - Immediately Invoked Function Expression
// Q. Why this is used? IEFE? Look at Lexical Scoping of Variable in JavaScript

// Q. Understand this code
function applyStyle(element, style) {
    if (element && style) {
        for (var prop in style) {
            if (style.hasOwnProperty(prop)) {
                element.style[prop] = style[prop];
            }
        }
    } else {
        console.warn('Please provide both element and style');
    }
}
function RandomColor(){
    var color =['blue','green','red','purple']
    var x= Math.round(Math.random()*3)
    return  color[x]
}
// Range x, y
function getRandomNumber() {
    return Math.random() * 2 - 1;
}
//dx dy random -1 1
function randomRange(appStartx, appStopy, appHeight, appWidth) {
    return {
        x: Math.random() * (appWidth - 10) + appStartx,
        y: Math.random() * (appHeight - 10) + appStopy
    };
}
// appStartx, appStopy, appHeight, appWidth

function Box(parentRef, dx, dy) {
    let randomPosition = randomRange(parentRef.style.left, parentRef.style.top, parentRef.clientHeight, parentRef.clientWidth); // Private
    var that = this;
    this.x = +randomPosition.x; // Public
    this.y = +randomPosition.y;
    this.dx = +getRandomNumber();
    this.dy = +getRandomNumber();
    this.width = 10;
    this.height = 10;
    this.color = RandomColor();
    this.element = document.createElement('div');
    applyStyle(this.element, { // static method. utility function
        position: 'absolute',
        top: this.y + 'px',
        left: this.x + 'px',
        backgroundColor: this.color,
        width: this.width + 'px',
        height: this.height + 'px',
        // borderRadius: '50%'
    });
    this.checkOnClick = function() {
        console.log('Box is clicked');
        that.element.style.display = 'none'

        // Remove this from DOM. 
        console.log(that.element);
        
    }
    parentRef.appendChild(this.element);
    // why bind is required;
    this.element.addEventListener('click', this.checkOnClick)
    this.move = function() { // member function
        this.x += this.dx;
        this.y += this.dy;
        var appLeft = parentRef.style.left;
        var appTop = parentRef.style.top;
        var appWidth = parentRef.clientWidth;
        var appHeight = parentRef.clientHeight;
    
        // Collision detection with the app container
        if (this.x <= 0 || this.x+this.width >= appWidth) {
            this.dx *= -1;  // Reverse horizontal direction
        }
    
        if (this.y <= 0 || this.y + this.height >= appHeight) {
            this.dy *= -1;  // Reverse vertical direction
        }
            applyStyle(this.element, {
                top: this.y + 'px',
                left: this.x + 'px'
            });

    }
    
}


(function() {
    var app = document.getElementById('app');
    var numberOfBoxes = 50;
    var gameFrameRate = 5;

    applyStyle(app, {
        border: '1px solid red',
        height: '400px',
        width: '400px',
        margin: '0 auto',
        marginTop: '50px',
        position: 'relative',

    });

    let boxes = [];
    // Q. GIVE RANDOM COLOR TO BOXES
    // Q. CONVERT THIS BOX TO BALLS
    // Ball Collision Algorithm different 
    // Box Collision different
    for (let i = 0; i < 50; i++) {
        boxes.push(new Box(app));
    }
    setInterval(() => {
        boxes.forEach(box1 => {
            let box1Properties = getBoxProperty(box1)
            
            boxes.forEach(box2 =>{
                let box2Properties = getBoxProperty(box2)
                let isCollided = checkCollision(box1Properties,box2Properties)
                if(isCollided){
                    box1.dx *=-1;
                    box1.dy *=-1;
                    box2.dx *=-1;
                    box2.dy *=-1;
                    
                }
            })
            box1.move();
            // collision use
            // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        });
    }, gameFrameRate)

    function checkCollision(rect1,rect2){
           return (rect1.x < rect2.x + rect2.w &&
            rect1.x + rect1.w > rect2.x &&
            rect1.y < rect2.y + rect2.h &&
            rect1.y + rect1.h > rect2.y)

    }

    function getBoxProperty(box){
        return {
            x: box.x,
            y: box.y,
            h: box.height,
            w: box.width
        }
    }

})();