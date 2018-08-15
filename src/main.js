var canvas = document.createElement("canvas");
document.getElementById("game-board").appendChild(canvas); 
var ctx = canvas.getContext("2d");
var width = "600px";
var height = "600px";
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);


var startButton = document.getElementById("start-game");
var stopButton = document.getElementById("stop-game");
gameoverImg = new Image();
gameoverImg.src = "images/gameover.png";
heartImg = new Image();
heartImg.src = "images/heart.png";
skullImg = new Image();
skullImg.src = "images/skull.png";
girlImg = new Image();
girlImg.src = "images/girl.png";

// Next iterations
// > change Star Constructor to Component Constructor, and creates hearts for score counts with the constructor
// starts by three hearts, it changes as scores goes up and down


var myGameArea = {

  introStart: function(){
    this.introInterval = setInterval(myGameArea.intro, 1000);
    console.log("interval", this.introInterval);
    
    // clearInterval(this.interval);
  },

  introCounter: 0,

  intro: function(){
    myGameArea.introCounter ++;
    ctx.font = "25px arial";
    ctx.fillStyle = "white";
    ctx.fillText("I lose power when snow hits me.. ", 100, 250);
    console.log("introCounter: ", myGameArea.introCounter);
    // girlImg.onload = function(){
      ctx.drawImage(girlImg, 300, 300, 72, 90);
    // }
    if(myGameArea.introCounter >=3){
      // myGameArea.introStop();
      myGameArea.introSecond();
    }
  },

  introSecond: function(){
    console.log("second intro");
    myGameArea.clear();
    ctx.fillText("I gain power when I catch star ", 100, 250);
    ctx.drawImage(girlImg, 300, 300, 72, 90);
    if(myGameArea.introCounter >=6){
      myGameArea.introThird();
    }
  },

  introThird: function(){
    console.log("third intro");
    myGameArea.clear();
    ctx.fillText("Let me live as long as possible!!", 100, 250);
    ctx.drawImage(girlImg, 300, 300, 72, 90);
    if(myGameArea.introCounter >=9){
      myGameArea.introFourth();
    }
  },

  introFourth: function(){
    console.log("fourth intro");
    myGameArea.clear();
    ctx.fillText("When you are ready, press Start or Space key", 100, 250);
    ctx.drawImage(girlImg, 300, 300, 72, 90);
  },

  introStop: function(){
    console.log("intro stop");
    clearInterval(this.introInterval);
  },

  start: function(){
    myGameArea.introStop();
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

  points: 3,
  score: function(){
    ctx.font = "20px arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Points: " + this.points, 500, 50);
  },

  gameover: function(){
    ctx.drawImage(gameoverImg, 50, 200, 496, 83);
  }
}

function updateGameArea(){
  for(var i = 0; i < snow.length; i++){
    if(girl.checkCrash(snow[i])){
      console.log("crash");
      ctx.drawImage(skullImg, girl.x + 10, girl.y, 30, 30);
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
  // girl.newPos();
  girl.draw();
  girl.hitWall();
  console.log("girl.x:", girl.x, "girl.speedX:",girl.speedX)
  
  // snow fall movement & draw
  for(var j = 0; j < snow.length; j++){
    snow[j].nextMove();
    snow[j].draw();
  }

  // every 150 frames, it generates a star
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
      myGameArea.points ++;
      ctx.drawImage(heartImg, girl.x, girl.y, 30, 30);
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

myGameArea.introStart();