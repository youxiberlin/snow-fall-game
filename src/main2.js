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
skullImg = new Image();
skullImg.src = "images/skull.png";
girlImg = new Image();
girlImg.src = "images/girl2.png";
var introGirl = function(){
  ctx.drawImage(girlImg, 300, 300, 90, 90);
}

var gameIntro = {
  counter: 0,

  start: function(){
    this.introInterval = setInterval(this.first, 1000);
    console.log("interval", this.introInterval);
  },

  first: function(){
    gameIntro.counter ++;
    console.log("introCounter: ", gameIntro.counter);
    ctx.font = "25px arial";
    ctx.fillStyle = "white";
    ctx.fillText("I lose power when snow hits me.. ", 100, 250);
    // ctx.drawImage(girlImg, 300, 300, 90, 90);
    introGirl();
    if(gameIntro.counter >=3){
      gameIntro.second();
    }
  },

  second: function(){
    console.log("second intro");
    myGameArea.clear();
    ctx.fillText("I gain power when I catch star ", 100, 250);
    introGirl();
    if(gameIntro.counter >=6){
      gameIntro.third();
    }
  },

  third: function(){
    myGameArea.clear();
    ctx.fillText("Let me live as long as possible!!", 100, 250);
    introGirl();
    if(gameIntro.counter >=9){
      gameIntro.fourth();
    }
  },

  fourth: function(){
    myGameArea.clear();
    ctx.fillText("When you are ready,", 100, 200);
    ctx.fillText("press Start or Space key", 100, 250);
    introGirl();
    if(gameIntro.counter >=15){
      gameIntro.stop();
    }
  },

  stop: function(){
    console.log("intro stop");
    clearInterval(this.introInterval);
  }
}

var myGameArea = {
  frame: 0,
  points: 3,

  start: function(){
    gameIntro.stop();
    this.interval = setInterval(updateGameArea, 1000/50);
    console.log("interval", this.interval);
  },

  // previous score
  // score: function(){
  //   ctx.font = "20px arial";
  //   ctx.fillStyle = "blue";
  //   ctx.fillText("Points: " + this.points, 500, 50);
  // },

  // making heart score //
  score: function(){
    while(score.length < myGameArea.points){
      for(var i = 0; i < myGameArea.points; i++){
        score.push(new Component(560-(score.length * 30), 20, 25, 25, "heart"));
      }     
    }
  },

  scoreDraw: function(){
    for(var i = 0; i < this.points; i++){
      score[i].draw();
    }     
  },

  clear: function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },

  stop: function(){
    clearInterval(this.interval);
    console.log("interval stop");
  },

  gameover: function(){
    ctx.drawImage(gameoverImg, 50, 200, 496, 83);
  }
}

function updateGameArea(){
  for(var i = 0; i < snow.length; i++){
    if(girl.checkCrash(snow[i])){
      console.log("crash");
      ctx.drawImage(skullImg, girl.x + 15, girl.y, 30, 30);
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
  myGameArea.scoreDraw();
  
  myGameArea.frame ++;
  console.log("frame", myGameArea.frame);

  // Random snow
  if(myGameArea.frame % 50 === 0){
    var randomX = Math.floor(Math.random()* 601);
    snow.push(new Component(randomX, 0, 20, 20, "snow"));
  }
    
  // girl movement & draw
  girl.draw();
  girl.hitWall();

  // snow fall movement & draw
  for(var j = 0; j < snow.length; j++){
    snow[j].draw();
    snow[j].nextMove();
  }

  // every 150 frames, it generates a star
  if(myGameArea.frame % 150 === 0){
    var randomX = Math.floor(Math.random()* 601);
    star.push(new Component(randomX, 0, 40, 40, "star"));
  }

  for(var x = 0; x < star.length; x++){
    star[x].nextMove();
    star[x].draw();
  }

  for(var i = 0; i < star.length; i++){
    if(girl.getStar(star[i])){
      console.log("got star!");
      myGameArea.points ++;
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

gameIntro.start();