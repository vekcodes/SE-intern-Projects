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
    this.width = 48;
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
function reload(){
    window.location.reload();
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
    let wrap = document.getElementById('wrap');
    applyStyle(wrap,{
        display:'flex'
    })
    let dashboard = document.getElementById('dashboard');
    applyStyle(dashboard,{
        height:'200px',
        width: '300px',
        background:'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        color:'white',
        margin: '0 auto',
        padding:'10px',
        fontFamily:'sans-serif',
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

    // setInterval(() => {
    //     let incomingcar = new IncomingCar();
    //     incomingcar.moveIncomingCar();
    // }, generate)
    var count=0;
    var cars=[];
    cars.push(movingCar)
    let run=setInterval(()=>{
        // movingCar.move()
        count+=15;
        if (count % 1000 === 0) {
            // console.log(count)
            let movingCar1 = new Car(randomLane(),true)
            cars.push(movingCar1)
            
        }
        var gameStatus = document.getElementById('gameStatus')
        cars.forEach(car1=>{
            let car1Properties = getCarProperty(stillcar)
            let car2Properties = getCarProperty(car1)
            let collided = checkCollision(car1Properties,car2Properties)
            let score = document.getElementById('score');
            score.innerHTML='Score:'+count;
            if(collided){
                gameStatus.innerHTML = 'Game Ended';
                clearInterval(run)
                // break;
            }
            car1.move();
        })
    },gameloop)

    function checkCollision(rect1, rect2) {
        return (rect1.x < rect2.x + rect2.w &&
            rect1.x + rect1.w > rect2.x &&
            rect1.y < rect2.y + rect2.h &&
            rect1.y + rect1.h > rect2.y)

    }
    function getCarProperty(car) {
            const rect = car.car.getBoundingClientRect();
            const trackRect = document.querySelector('.race-track').getBoundingClientRect();
            return {
                x: rect.left - trackRect.left,
                y: parseFloat(car.y), 
                w: car.car.offsetWidth,
                h: car.car.offsetHeight
        }
    }
})();