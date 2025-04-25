function applyStyle(element, style){
    if (element && style){
        for(var prop in style){
            if(style.hasOwnProperty(prop)){
                element.style[prop] = style[prop]
            }
            else{
                console.log('no properites')
            }
        }
    }
}
function randomRange(startx,stopy,height,width){
    return {
        x:Math.random()*(width-10)+ startx,
        y:Math.random()*(height-10)+stopy
    }
}
function xyRandomVelocity(){
    return Math.random()*2-1;
}
function randomColor(){
    let color = [
        "#FF5733", "#FF6F33", "#FF8633", "#FF9E33", "#FFB533", "#FFCC33", "#FFE033", "#FFF533",
        "#E3FF33", "#C8FF33", "#ADFF33", "#91FF33", "#76FF33", "#5BFF33", "#3FFF33", "#24FF33",
        "#33FF57", "#33FF72", "#33FF8D", "#33FFA8", "#33FFC4", "#33FFDF", "#33FFF5", "#33E3FF",
        "#33C8FF", "#33ADFF", "#3391FF", "#3376FF", "#335BFF", "#333FFF", "#3324FF", "#5733FF",
        "#7233FF", "#8D33FF", "#A833FF", "#C433FF", "#DF33FF", "#F533FF", "#FF33E3", "#FF33C8",
        "#FF33AD", "#FF3391", "#FF3376", "#FF335B", "#FF333F", "#FF3324", "#FF5733", "#FF6F57",
        "#FF8672", "#FF9E8D", "#FFB5A8", "#FFCCC4", "#FFE0DF", "#FFF5F5", "#E3FFF5", "#C8FFDF",
        "#ADFFC4", "#91FFA8", "#76FF8D", "#5BFF72", "#3FFF57", "#24FF3F", "#33FF24", "#57FF33",
        "#72FF57", "#8DFF72", "#A8FF8D", "#C4FFA8", "#DFFFC4", "#F5FFDF", "#FFF5E3", "#FFDFE3",
        "#FFC4D8", "#FFA8C4", "#FF8DA8", "#FF7291", "#FF576B", "#FF3F57", "#FF2440", "#FF0A2B"
      ];
    let a =Math.round(Math.random()*79);
    return color[a]; 
}
function Box(parentRef, dx,dy){
    this.height = 5;
    this.width = 5;
    let randomPosition = randomRange(parentRef.style.left,parentRef.style.top, parentRef.clientHeight,parentRef.clientWidth);
    this.x =+randomPosition.x
    this.y =+randomPosition.y
    this.dx =+xyRandomVelocity();
    this.dy =+xyRandomVelocity();
    this.color= randomColor();
    this.border = '0.5px solid black';
    this.radius= 2.5;
    this.element = document.createElement('div');
    applyStyle(this.element,{
        width:this.width+'px',
        height: this.height +'px',
        backgroundColor:this.color,
        position:'absolute',
        top:this.y +'px',
        left:this.x+'px',
        border:this.border,
        borderRadius:'50%'
    })
    parentRef.appendChild(this.element)
    this.move = function(){
        this.x +=this.dx;
        this.y +=this.dy;
        var parentHeight = parentRef.clientHeight;
        var parentWidth = parentRef.clientWidth;
        // var parentX = parentRef.style.left;
        // var parentY = parentRef.style.top;

        if(this.x <=0 || this.x+this.width >= parentWidth){
            this.dx *=-1;
        }
        if(this.y<=0 || this.y+this.height >= parentHeight){
            this.dy *=-1;
        }
        applyStyle(this.element,{
            top:this.y+'px',
            left:this.x+'px'
        })
    }
}

(function(){
    var app = document.getElementById('app');
    var frameRate=50;
    applyStyle(app,{
        border:'1px solid black',
        height: '300px',
        width:'300px',
        position:'relative',
        margin:'0 auto',
        marginTop:'20px'
    })

    //Making Body black
    // var body = document.getElementById('body');
    // applyStyle(body,{
    //     backgroundColor:'black'
    // })
    
    var boxes=[]
    // console.log(box1.x , box1.y)
    for(var i=0;i<100;i++){
        boxes.push(new Box(app))
    }

    setInterval(()=>{
        boxes.forEach(box1 => {
            let box1Properties = getProperties(box1);
            boxes.forEach(box2 =>{
                let box2Properties = getProperties(box2);
                let distance = detectCollisionDistance(box1Properties,box2Properties);
                let collision = distance < box1.radius + box2.radius;
                if(collision){
                    box1.dy *=-1
                    box1.dx *=-1
                    box2.dy *=-1
                    box2.dx *=-1
                }

            })
            box1.move();
        });
    },frameRate)

    function detectCollisionDistance(circle1,circle2){
        const dx = circle1.x - circle2.x;
        const dy = circle1.y - circle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return (distance);
    }
    function getProperties(box){
        return {
            x:box.x,
            y:box.y,
            h:box.height,
            w:box.width
        }
    }

})();

