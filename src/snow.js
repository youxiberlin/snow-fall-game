var endAngle = Math.PI*2;

function Snow(x, y, radius, startAngle){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.startAngle = startAngle;
  this.speedX = 0;
  this.speedY = 2;
  this.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(this.x, this.y, this.radius, this.startAngle, endAngle, true);
    ctx.fill();
    // console.log("snow-draw");
  }
  this.bottom = function(){return this.y + this.radius - 1}
  this.left = function(){ return this.x - this.radius}
  this.right = function(){ return this.x + this.radius}
  this.top = function(){return this.y - this.radius}
  this.nextMove = function() {
    this.y += this.speedY;
  }
}

/// star ////
var star = [];
function Star(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 2;
  this.img = new Image();
  this.img.src = "images/star.png";
  this.draw = function(){
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  this.nextMove = function(){
    this.y += this.speedY;
  }
  this.top = function(){return this.y}
  this.bottom = function(){return this.y + this.height}
  this.left = function(){return this.x}
  this.right = function(){return this.x + this.width}
}


