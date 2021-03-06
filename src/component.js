var snow = [];
var star = [];
var score = [];
var riceball = [];
var winRiceball = [];
var heart = [];
var skull = new Component(100,100,30,30,"skull");
var introRice = new Component(250,280,40,40,"rice-ball");
var introStar = new Component(250,280,40,40,"star");


function Component(x, y, width, height, img){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 2;
  this.img = new Image();
  this.img.src = "images/" + img + ".png";

  this.draw = function(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  this.nextMove = function(){
    this.y += this.speedY;
  }

  this.fall = function(){
    this.y += 1.3 * this.speedY;
  }

  this.top = function(){return this.y}
  this.bottom = function(){return this.y + this.height}
  this.left = function(){return this.x}
  this.right = function(){return this.x + this.width}
}

Component.prototype.generate = function(){
  ctx.drawImage(this.img, 200, 500, 20, 20);
}
// 

