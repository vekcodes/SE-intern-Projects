function applyStyle(element, style) {
    if (element && style) {
        for (var prop in style) {
            if (style.hasOwnProperty(prop)) {
                element.style[prop] = style[prop];
            }
        }
    }
}

function Car(lane,isIncomingCar) {
    this.y = isIncomingCar? 0:270;
    this.car = document.createElement('img');
    this.car.src = 'car.png'
    this.height = 100;
    this.width = "auto";
    this.lane = lane || 0;
    this.lanes = ['10px', '170px', '340px'];
    applyStyle(this.car, {
        height: this.height + 'px',
        width: this.width,
        padding: '20px',
        position: 'absolute',
        transform: isIncomingCar ?'rotate(180deg)':undefined,
        top: this.y +"px",
        left: this.lanes[this.lane]

    });
    document.querySelector('.race-track').appendChild(this.car);
    this.moveIncomingCar = () => {
        applyStyle(this.car,{

        })
    };

    this.move = function(){
        if(!isIncomingCar){
            return 0;
        }
        this.y += 5;
        applyStyle(this.car,{
            top:this.y +'px'
        })
    }
}
function randomLane() {
    return Math.round(Math.random() * 2)
}

(function () {
    var raceTrack = document.getElementById('race-track');
    var gameloop = 50;
    applyStyle(raceTrack, {
        height: '400px',
        width: "50%",
        margin: '0 auto',
        position: 'relative',
        backgroundImage: 'url("rc.png")',
        backgroundSize: 'cover',  // Ensures the image covers the element
        backgroundRepeat: 'no-repeat',  // Prevents repeating
        backgroundPosition: 'center',  // Centers the image
        overflow: 'hidden'
    })

    var stillcar = new Car(0,false);
    var movingCar = new Car(1,true);
    document.addEventListener('DOMContentLoaded', function () {


        document.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') {
                moveCar(0);  // Move up
            } else if (event.key === 'ArrowRight') {
                moveCar(2);   // Move down
            }
            else if (event.key === 'ArrowDown') {
                moveCar(1)
            }
        });
        function moveCar(direction) {
            if (direction === 0) {
                stillcar.lane = 0
            }
            if (direction === 1) {
                stillcar.lane = 1;
            }
            if (direction === 2) {
                stillcar.lane = 2;
            }
            stillcar.car.style.left = stillcar.lanes[stillcar.lane];
        }
    });
    let car1 = getCarProperty(stillcar)
    let car2 = getCarProperty(movingCar)
    let collided = checkCollision(car1, car2)
    // setInterval(() => {
    //     let incomingcar = new IncomingCar();
    //     incomingcar.moveIncomingCar();
    // }, generate)
    var count=0;
    var cars=[];
    cars.push(movingCar)
    cars.push(stillcar)
    setInterval(()=>{
        // movingCar.move()
        count+=5;
        if (count % 1000 === 0) {
            console.log(count)
            let movingCar1 = new Car(randomLane(),true)
            cars.push(movingCar1)
            
        }
        cars.forEach(car=>{
            car.move()
        })
    },gameloop)

    function checkCollision(rect1, rect2) {
        return (rect1.x < rect2.x + rect2.w &&
            rect1.x + rect1.w > rect2.x &&
            rect1.y < rect2.y + rect2.h &&
            rect1.y + rect1.h > rect2.y)

    }
    function getCarProperty(car) {
        return {

        }
    }
})();