function ball(x,y,r,speedX,speedY){
this.x = x;
this.y = y;
this.r = r;
this.speedX = speedX;
this.speedY = speedY;
}
var paddleY=250;
var paddleHeight=200;
var paddleCY=250;
var canvas;
var ctx;
var playerScore = 0;
var computerScore = 0;
var  bal = new ball(200,400,30,10,5);

function getMousePos(evt){
var rect = canvas.getBoundingClientRect();
var mouseX = evt.clientX - rect.left;
var mouseY = evt.clientY - rect.top;
return {
x:mouseX,
y:mouseY
};
}

window.onload = function(){
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

var w = window.innerWidth;
var h = window.innerHeight;
canvas.width = w;
canvas.height = h;
var framePerSec=30;
setInterval(function(){
    move();
    draw();
   
},1000/framePerSec);
canvas.addEventListener('mousemove',function(evt){
    var mousePos = getMousePos(evt);
    paddleY=mousePos.y-(paddleHeight/2);
});

}

function move(){
    makeAI();
    bal.x+=bal.speedX;
    bal.y+=bal.speedY;
    if(bal.x > (window.innerWidth-bal.r)){
 
        if(
            ((bal.y+bal.r) > paddleCY) && ((bal.y+bal.r) < (paddleCY + paddleHeight))
            ||
            ((bal.y-bal.r) > paddleCY) && ((bal.y-bal.r) < (paddleCY + paddleHeight))
            
            ){
            bal.speedX = -bal.speedX;
        }else{
            reset();
            playerScore+=1;
        }
    }
    if(bal.x < (bal.r)){
        if(
            ((bal.y+bal.r) > paddleY) && ((bal.y+bal.r) < (paddleY + paddleHeight))
            ||
            ((bal.y-bal.r) > paddleY) && ((bal.y-bal.r) < (paddleY + paddleHeight))
            
            ){
            bal.speedX = -bal.speedX;
        }else{
            reset();
            computerScore+=1;
        }
    }
    if(bal.y < bal.r){
        bal.speedY = -bal.speedY;
    }
    if(bal.y > (window.innerHeight-bal.r)){
        bal.speedY = -bal.speedY;
    }
}




function makeAI(){
    var center= paddleCY + (paddleHeight/2);
    if(center < (bal.y-50)){
        paddleCY += 10;
    }else if(center > (bal.y+50)){
        paddleCY -= 10;
    }
}

function reset(){
    bal.speedX = -bal.speedX;
    bal.x = window.innerWidth/2;
    bal.y = window.innerHeight/2;
}

function draw(){
    
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight); 
    //player
    colorRect(50, paddleY, 10, paddleHeight,"white");
    //computer
    colorRect(window.innerWidth-50, paddleCY, 10, paddleHeight,"green");
    colorCircle(bal.x,bal.y,bal.r,"red");
    fillText(playerScore,100,100);
    fillText(computerScore,window.innerWidth-100,100);
}

function fillText(txt,x,y){
    ctx.fillStyle = 'red';
    ctx.font = "20px Georgia";
    ctx.fillText(txt, x, y);
}

function colorCircle(x,y,r,color){
    ctx.beginPath();
    ctx.arc(x,y, r, 0, 2 * Math.PI, true);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

function colorRect(x,y,w,h,color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}