
var Player = function(x, y){

  this.x = x;
  this.y = y;
  this.vel = 0;
  this.acel = 0;
  
}

Player.prototype.draw = function(){

  fill(232, 21, 21);
  ellipse(this.x, this.y, 20, 20);

}

Player.prototype.jump = function(){
  this.vel =- 5;
}

Player.prototype.update = function(){

  this.vel += this.acel;
  this.y   += this.vel;
  this.acel = 0;
  if(this.y > height * 0.85 - 10) 
    this.y = height * 0.85 - 10;

  if(this.y < 10) 
    this.y = 10;

}
