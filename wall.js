
var Wall = function(x, y){

 this.x = x; 
 this.y = y;
}

Wall.prototype.draw = function(){

  fill(211, 120, 21);
  rect(this.x, 0, 60, this.y - 50);
  rect(this.x, this.y + 50, 60, height - this.y - 50);

}

Wall.prototype.update = function(){
  this.x-=3;
}