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


var gameIntro = {
  counter: 0,

  start: function(){
    this.introInterval = setInterval(this.first, 1000);
  },

  first: function(){
    gameIntro.counter ++;
    ctx.font = "25px arial";
    ctx.fillStyle = "white";
    ctx.fillText("I lose power when snow hits me.. ", 100, 250);
    girlIntro.draw();

    if(gameIntro.counter >=3){
      gameIntro.second();
    }
  },

  second: function(){
    console.log("second intro");
    myGameArea.clear();
    ctx.fillText("I gain power when I catch a star ", 120, 250);
    girlIntro.draw();
    if(gameIntro.counter >=6){
      gameIntro.third();
    }
  },

  third: function(){
    myGameArea.clear();
    ctx.fillText("I also want to share my fav food..", 100, 250);
    girlIntro.draw();
    if(gameIntro.counter >=9){
      gameIntro.fourth();
    }
  },

  fourth: function(){
    myGameArea.clear();
    ctx.fillText("That is Riceball or Onigiri", 150, 250);
    girlIntro.draw();
    if(gameIntro.counter >=13){
      gameIntro.fifth();
    }
  },

  fifth: function(){
    myGameArea.clear();
    ctx.fillText("When you are ready,", 120, 200);
    ctx.fillText("press Start or Space key", 120, 250);
    girlIntro.draw();
    if(gameIntro.counter >=18){
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
  time: 100,

  start: function(){
    gameIntro.stop();
    this.interval = setInterval(updateGameArea, 1000/70);
    console.log("interval", this.interval);
  },

  // making heart score //
  score: function(){
    while(score.length < myGameArea.points){
      for(var i = 0; i < myGameArea.points; i++){
        score.push(new Component(560-(score.length * 32), 20, 26, 26, "heart2"));
      }     
    }
  },

  scoreDraw: function(){
    for(var i = 0; i < this.points; i++){
      score[i].draw();
    }     
  },

  timeDisplay: function(){
    ctx.font = "18px arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Time left: " + this.time, 470, 80);
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
  },

  heartDraw: function(){
    for(var i = 0; i < heart.length; i++){
      heart[i].draw();
    }
  },
}

var gameEnd = {
  winRice: function(){
    for(var i = 0; i < 150; i++){
      console.log("win rice created");
      var randomX = Math.floor(Math.random()* 601);
      winRiceball.push(new Component(randomX, -550 + i*10, 30, 30, "rice-ball"));
    }
  },

  winRiceDraw: function(){
    ctx.clearRect(0,0,600,600);
    for(var x = 0; x < 80; x++){
      console.log("rice draw");
      winRiceball[x].y += 10;
      winRiceball[x].draw();
      if(winRiceball[x].y > 600){
        winRiceball[x].y = -1000 + x * 10;
      }
    }
    ctx.font = "35px arial";
    ctx.fillStyle = "red";
    ctx.fillText("I won! Yaaaaay!!", 200, 250);
    girlIntro.draw();
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
  var randomX = Math.floor(Math.random()* 601);


  // "You win" display
  if(myGameArea.time > 0 && myGameArea.points >= 17){
    // myGameArea.stop();
    console.log("you won");
    gameEnd.winRice();
    gameEnd.winRiceDraw();
    return;
  }

  if(myGameArea.frame % 70 === 0){
    myGameArea.time --;
    console.log(myGameArea.time);
  }
  myGameArea.timeDisplay();
  if(myGameArea.time < 1){
    myGameArea.stop();
    myGameArea.gameover();
    girl.draw();
    ctx.drawImage(skullImg, girl.x + 15, girl.y, 30, 30);
    return;
  }

  // girl movement & draw
  girl.draw();
  girl.hitWall();
  myGameArea.heartDraw();

  // Random snow and more snow when the games goes on
  if(myGameArea.frame < 1400){
    if(myGameArea.frame % 90 === 0){
      var randomX = Math.floor(Math.random()* 601);
      snow.push(new Component(randomX, 0, 20, 20, "snow"));
    } 
  } else if (myGameArea.frame < 2100){
    if(myGameArea.frame % 60 === 0){
      var randomX = Math.floor(Math.random()* 601);
      snow.push(new Component(randomX, 0, 20, 20, "snow"));
    } 
  } else if (myGameArea.frame < 2800){
    if(myGameArea.frame % 30 === 0){
      var randomX = Math.floor(Math.random()* 601);
      snow.push(new Component(randomX, 0, 20, 20, "snow"));
    } 
   } else {
    if(myGameArea.frame % 20 === 0){
      var randomX = Math.floor(Math.random()* 601);
      snow.push(new Component(randomX, 0, 20, 20, "snow"));
    } 
  }

  // snow speed change when the game goes on
  if(myGameArea.frame < 1400){
    for(var j = 0; j < snow.length; j++){
      snow[j].draw();
      snow[j].nextMove();
    }
  } else if(myGameArea.frame < 2100){
    for(var j = 0; j < snow.length; j++){
      snow[j].draw();
      snow[j].speedY = 2.5;
      snow[j].nextMove();
    }
  } else {
    for(var j = 0; j < snow.length; j++){
      snow[j].draw();
      snow[j].speedY = 2.7;
      snow[j].nextMove();
    }
  }

  // every 150 frames, it generates a star
  if(myGameArea.frame % 250 === 0){
    var randomX = Math.floor(Math.random()* 601);
    star.push(new Component(randomX, 0, 40, 40, "star"));
  }
   for(var x = 0; x < star.length; x++){
    star[x].nextMove();
    star[x].draw();
  }

  // when the girl catch a start, generates hearts
  for(var i = 0; i < star.length; i++){
    if(girl.getStar(star[i])){
      console.log("got star!");
      myGameArea.points ++;
      star.splice(i,1);
    
      var minY = girl.y - 2 * 10

      heart.push(new Component(girl.x, girl.y, 20, 20, "heart"));
      
      for (var i = 0 ; i < 3; i++) {
        setTimeout(function() {
          if (heart[0].y <= minY) {
            heart.splice(0,1);
          }
          else {
            heart[0].x -= 10
            heart[0].y -= 10
          }
          }, 100*(i+1))
      }
    }
  }

  //every 10000 frames, it generates superpower Rice-ball
  if(myGameArea.frame % 1200 === 0){
    var randomX = Math.floor(Math.random()* 601);
    riceball.push(new Component(randomX, 0, 30, 30, "rice-ball"));
  }

  for(var y = 0; y < riceball.length; y++){
    riceball[y].fall();
    riceball[y].draw();
  }

  for(var i = 0; i < riceball.length; i++){
    if(girl.getStar(riceball[i])){
      console.log("got riceball!");
      myGameArea.points += 3;
      riceball.splice(i,1);
      var girlX = girl.x;
      var girlY = girl.y;
      heart.push(new Component(girlX, girlY, 40, 40, "heart"));
      setTimeout(function() {
        heart.splice(0,1);
        heart.push(new Component(girlX-10, girlY-10, 40, 40, "heart"));
        setTimeout(function() {
          heart.splice(0,1);
          heart.push(new Component(girlX-20, girlY-20, 40, 40, "heart"));
          setTimeout(function() {
            heart.splice(0,1);
          }, 100)
        }, 100)
      }, 100)
    }

  }

}

document.body.onkeyup = function(e){
  if(e.keyCode == 32){
    myGameArea.start();
  }
}

startButton.onclick = function(){
  myGameArea.start();
}

stopButton.onclick = function(){
  myGameArea.stop();
}

gameIntro.start();



