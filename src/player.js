function Player(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.img = new Image();
  // this.img.src = "images/girl.png";
  this.img.src = "images/girl2.png";

  this.draw = function(){
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  this.moveRight = function(){
    this.x += 5;
  }

  this.moveLeft = function(){
    this.x -= 5;
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
      this.x = 550;
    }
  }
}

var girl = new Player(200, 540, 60, 60);

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
      girl.moveLeft();
      break;
    case 39:
      girl.moveRight();
      break;
  }
};

