
function Network(arr){
  
  
  this.neurons = [];
  
  for(var i = 0; i < arr.length; i++){
    this.neurons[i] = [];

    for(var j = 0; j < arr[i]; j++){

      // Napravi neurone
      //this.neurons[i][j] = new Neuron(i*20, j*20);
      this.neurons[i][j] = new Neuron();
      
      if(i > 0){
        // Napravi konekcije za prvi sloj
        this.neurons[i][j].connections = this.neurons[i - 1];
        
        for(var n = 0; n < arr[i - 1]; n++){
          // Napravi tezine
          this.neurons[i][j].weigths[n + 1] = random(-1, 1);
        }
      }
    }
  }
  
  // Postavi input
  this.inputs  = this.neurons[0];

  // Postavi output
  this.outputs = this.neurons[this.neurons.length - 1];
}


Network.prototype.applyGenetic = function(genetic){

  var p = 0;

  for(var i = 0; i < this.neurons.length; i++){

    for(var n = 0; n < this.neurons[i].length; n++){

      for(var j = 0; j < this.neurons[i][n].weigths.length; j++){

        this.neurons[i][n].weigths[j] = genetic[p];
        p++;

      }
    }
  }

}


Network.prototype.clear = function(){

  for(var i = 0; i < this.neurons.length; i++){

    for(var j = 0; j < this.neurons[i].length; j++){

      this.neurons[i][j].sum = undefined;

    }

  }

}

function Neuron(x, y){

  //this.pos = createVector(x,y);
  this.weigths     = [random(-1,1)];
  this.connections = [];
  this.sum = undefined;

}

Neuron.prototype.output = function(){

  if(this.sum == undefined){

    this.sum = 0.0;

    for(var i = 0; i < this.connections.length; i++){

      this.sum += this.connections[i].output() * this.weigths[i + 1];

    }

    this.sum += this.weigths[0];
  }
  
  return this.sum;
}


/*Display of neural network*/

/*Neuron.prototype.display = function(x,y){
  var c = map(this.sum,-1,1,-255,255);
  fill((c<0)?-c:0,(c>0)?c:0,0);
  stroke(0);
  strokeWeight(0.6);
  ellipse(this.pos.x + x,this.pos.y + y,10,10);
  for(var i = 0;i<this.connections.length;i++){
    var c = (this.weigths[i]>0)? color(0,255,0) : color(255,0,0);
    stroke(c);
    strokeWeight(2*this.weigths[i]*this.weigths[i]);
    line(this.pos.x + x,this.pos.y + y,this.connections[i].pos.x + x,this.connections[i].pos.y + y);
  }
}

Network.prototype.display = function(x,y){
  fill(0);
  noStroke();
  textAlign(LEFT,CENTER);
  for(var i = 0; i<this.inputs.length;i++){
    text(floor(this.inputs[i].sum*1000)/1000,this.inputs[i].pos.x+x,this.inputs[i].pos.y+y);
  }
  for(var i = 0; i<this.outputs.length;i++){
    text(floor(this.outputs[i].sum*1000)/1000,this.outputs[i].pos.x+55+x,this.outputs[i].pos.y+y);
  }
  for(var i = 0; i<this.neurons.length;i++)
    for(var j = 0;j<this.neurons[i].length;j++)
      this.neurons[i][j].display(x+45,y);
  
  
}


function Input(x,y){
  this.pos = createVector(x,y);
  this.value = random(0,1);
}

Input.prototype.output = function(){
  return this.value;
}

Input.prototype.display = function(){
  fill(255*this.value,255*this.value,0);
  stroke(0);
  strokeWeight(0.6);
  rect(this.pos.x-4,this.pos.y-4,8,8);
  textSize(10);
  text(floor(this.value*1000)/1000,this.pos.x-40,this.pos.y+5);
}*/