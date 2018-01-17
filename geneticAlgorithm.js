function Specie(genetic){

  this.fitness = 1;
  this.genetic = [];

  // Ako nema genetski materijal popuni ga
  if(!genetic){
    for(var i = 0; i < nCon; i++){
      this.genetic[i] = random(-1, 1);
    }
  }
  else this.genetic = genetic;
  
  this.bird = new Player(width * 0.2, height / 2);

  // Svakoj jedinki napravi neuralnu mrezu
  this.network = new Network(neuronsColluns);

  // Tezine mreze popuni genetskim materijalom
  this.network.applyGenetic(this.genetic);

}

// Crtanje ptice
Specie.prototype.draw = function(){ 

  this.bird.draw();
}

Specie.prototype.update = function(){
  // Postavi sume neurona na null
  this.network.clear();
  
  // Nahrani ulaze
  this.network.inputs[0].sum = this.bird.x / 100;
  this.network.inputs[1].sum = this.bird.y / 100;
  
  this.network.inputs[2].sum = wall[0].x / 100;
  this.network.inputs[3].sum = wall[0].y / 100;
  
  // Ubrzaj pticu
  this.bird.acel += 0.4;

  // Izracuna output mreze
  this.network.outputs[0].output();

  // Ako je output veci od 1 ptica treba da skoci
  if(this.network.outputs[0].sum > 1)
    this.bird.jump();

  this.bird.update();
}

function NewGenerate(deads){

  var b = 0;
  var fitMax = 1;

  // Nadji jedinku sa najvecim fitness-om i zapamti joj poziciju
  for(var i = 0; i < deads.length; i++){
     if(deads[i].fitness > fitMax){
      fitMax = deads[i].fitness; 
      b = i;
    }
  }
  
  // Genetski materijal jedinke sa najvecim fitness-om
  var maxFitGen = [new Specie(deads[b].genetic.slice())];
  
  while(maxFitGen.length < nGen - 1){

    var a = pick(deads,fitMax);
    
    mutate(a);
    
    maxFitGen.push(new Specie(a));
  }

  maxFitGen.push(new Specie());
  return maxFitGen;
}

function mutate(arr){

  var m = mutRang;

  if(random(1) < 0.3) 
    m = mutRang * 10;

  for(var i = 0; i < arr.length; i++){
    if(random(1) < m)
      arr[i] = random(-1, 1);
  }
}

function pick(deads, fitMax){

  var i = floor(random(deads.length));
  var p = deads[i];

  while(random(1) > p.fitness / fitMax){
    i = floor(random(deads.length));  
    p = deads[i];
  }

  return p.genetic.slice();
}