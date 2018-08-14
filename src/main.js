var canvas = document.createElement("canvas");
document.getElementById("game-board").appendChild(canvas); 
var ctx = canvas.getContext("2d");
var width = "600px";
var height = "600px";
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

var snow = [];
var startButton = document.getElementById("start-game");
var stopButton = document.getElementById("stop-game");


function startGame(){
  myGameArea.start();
}

var myGameArea = {
  start: function(){
    this.interval = setInterval(updateGameArea, 1000/50);
    console.log("interval", this.interval);
  },
  frame: 0,
  clear : function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  stop: function(){
    clearInterval(this.interval);
    console.log("interval stop");
  },
  points: 5,
  score: function(){
    ctx.font = "20px arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Points: " + this.points, 500, 50);
  },
  gameover: function(){
    ctx.font = "80px arial";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over!", 80, 250);
  }
}

function updateGameArea(){
  for(var i = 0; i < snow.length; i++){
    if(girl.checkCrash(snow[i])){
      console.log("crash");
      myGameArea.points --;
      snow.splice(i,1);
      if(myGameArea.points === 0){
        myGameArea.stop();
        myGameArea.gameover();
        return;
      }
    }
  }

  myGameArea.clear();
  myGameArea.score();
  myGameArea.frame ++;
  console.log("frame", myGameArea.frame);

  // Random snow
  if(myGameArea.frame % 50 === 0){
    var randomX = Math.floor(Math.random()* 601);
    snow.push(new Snow(randomX, 0, 10, 0));
  }
  
  // girl movement & draw
  girl.newPos();
  girl.draw();
  girl.hitWall();
  console.log("girl.x:", girl.x, "girl.speedX:",girl.speedX)
  
  // snow fall movement & draw
  for(var j = 0; j < snow.length; j++){
    snow[j].nextMove();
    snow[j].draw();
    // console.log("snow j:", i);
  }

  // every 10 frames, it generates a star
  if(myGameArea.frame % 150 === 0){
    var randomX = Math.floor(Math.random()* 601);
    star.push(new Star(randomX, 5, 40, 40));
  }
  for(var x = 0; x < star.length; x++){
    star[x].nextMove();
    star[x].draw();
  }
  for(var i = 0; i < star.length; i++){
    if(girl.getStar(star[i])){
      console.log("got star!");
      myGameArea.points +=3;
      star.splice(i,1);
    }
  }

}

startButton.onclick = function(){
  myGameArea.start();
}

document.body.onkeyup = function(e){
  if(e.keyCode == 32){
    myGameArea.start();
  }
}

stopButton.onclick = function(){
  myGameArea.stop();
}

