function Player(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 5;
  this.g = 0.1;
  this.img = new Image();
  // this.img.src = "images/girl.png";
  this.img.src = "images/girl2.png";

  this.draw = function(){
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  this.moveRight = function(){
    this.x += 10;
  }

  this.moveLeft = function(){
    this.x -= 10;
  }

  


  this.top = function(){return this.y}
  this.left = function(){ return this.x}
  this.right = function(){ return this.x + this.width}
  this.checkCrash = function(snow){
    var firstCon = snow.right() < this.left() || snow.left() > this.right();
    var secondCon = snow.bottom() < this.top() || snow.top() > 600;
    var thirdCon = !secondCon && firstCon;
    return !(firstCon || secondCon || thirdCon);
  }

  this.getStar = function(star){
    var firstCon = star.right() < this.left() || star.left() > this.right();
    var secondCon = star.bottom() < this.top() || star.top() > 600;
    var thirdCon = !secondCon && firstCon;
    return !(firstCon || secondCon || thirdCon);
  }

  this.hitWall = function(){
    if(this.left() <= 0){
      this.x = 0;
    }
    if(this.right() >=600){
      this.x = 540;
    }
  }
}

var girl = new Player(200, 540, 60, 60);
var girlIntro = new Player(300, 300, 96, 96);

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
      girl.moveLeft();
      break;
    case 39:
      girl.moveRight();
      break;
    case 38:
    //  setInterval(girl.jump, 20);
      // girl.jump();
      break;
  }
};

