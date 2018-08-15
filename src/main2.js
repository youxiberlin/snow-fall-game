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
  },

  first: function(){
    gameIntro.counter ++;
    ctx.font = "25px arial";
    ctx.fillStyle = "white";
    ctx.fillText("I lose power when snow hits me.. ", 100, 250);
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
    this.interval = setInterval(updateGameArea, 1000/70);
    console.log("interval", this.interval);
  },

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
  },

  heartDraw: function(){
    for(var i = 0; i < heart.length; i++){
      heart[i].draw();
    }
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
  // Random snow
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
   }else {
    if(myGameArea.frame % 15 === 0){
      var randomX = Math.floor(Math.random()* 601);
      snow.push(new Component(randomX, 0, 20, 20, "snow"));
    } 
  }

    
  // girl movement & draw
  girl.draw();
  girl.hitWall();
  myGameArea.heartDraw();

  // snow fall movement & draw
  // for(var j = 0; j < snow.length; j++){
  //   snow[j].draw();
  //   snow[j].nextMove();
  // }
  
  if(myGameArea.frame < 1400){
    console.log("1400");
    for(var j = 0; j < snow.length; j++){
      snow[j].draw();
      snow[j].nextMove();
    }
  } else if(myGameArea.frame < 2100){
    console.log("1400 - 2100");
    for(var j = 0; j < snow.length; j++){
      snow[j].draw();
      snow[j].speedY = 2.5;
      snow[j].nextMove();
    }
  } else {
    console.log("2100<");
    for(var j = 0; j < snow.length; j++){
      snow[j].draw();
      snow[j].speedY = 3;
      snow[j].nextMove();
    }
  }



  // every 150 frames, it generates a star
  if(myGameArea.frame % 280 === 0){
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
      
      // for(var i = 0; i < 3; i++){
      //   heart.push(new Component(girl.x + i* 10, girl.y + i* 10, 20, 20, "heart"));
      // }
      var girlX = girl.x;
      var girlY = girl.y;
      heart.push(new Component(girlX, girlY, 20, 20, "heart"));
      setTimeout(function() {
        heart.splice(0,1);
        heart.push(new Component(girlX-10, girlY-10, 20, 20, "heart"));
        setTimeout(function() {
          heart.splice(0,1);
          heart.push(new Component(girlX-20, girlY-20, 20, 20, "heart"));
          setTimeout(function() {
            heart.splice(0,1);
          }, 100)
        }, 100)
      }, 100)
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