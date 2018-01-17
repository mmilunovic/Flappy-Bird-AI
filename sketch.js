var neuronsColluns = [4,4,3,1]; //[Inputs, hide , output]
var nCon = 0; 

var nGen = 300;
var mutRang = 0.01;

var score = 0;
var record = 0;


var generation = [];
var deads = [];

var wall = [];

function setup() {

  createCanvas(800,500);

   for(var i = 1; i < neuronsColluns.length; i++)
     nCon += (neuronsColluns[i - 1] + 1) * neuronsColluns[i];

  nCon += neuronsColluns[0];
  
  // Napravi generaciju
  for(var i = 0; i < nGen; i++){
    generation[i] = new Specie(); 
  }

 // Napravi zid
  wall.push(new Wall(width, random(height * 0.3, height * 0.7)));
} 

var pass = true;
var fitness = 0;
var timeJump = 1;

// Ubrzanje
function keyPressed(){
  if(keyCode === 39) timeJump *= 2;
  
  if(timeJump>1)
    if(keyCode === 37) timeJump /= 2;
}


var time = 0;
var gen = 0;


function draw() {

  for(var t = 0; t < timeJump; t++){

    fitness++;
    time++;

    if(generation[0].bird.x >= wall[0].x + 70 && pass){
        score++;
        pass = false;
    } 

    for(var i = generation.length - 1; i >= 0; i--){

      // Provera da li je ptica umrla
      if(pass && 
        (generation[i].bird.y <= 10 || generation[i].bird.y >= height * 0.85 - 10 ||
          (generation[i].bird.x >= wall[0].x - 10 && generation[i].bird.x <= wall[0].x + 70)
            &&(generation[i].bird.y > wall[0].y + 35 || generation[i].bird.y < wall[0].y - 35)
          )
        ){

        if(score > record) 
          record = score;

        generation[i].fitness = fitness;

        deads.push(generation.splice(i, 1)[0]);

        continue;
      }
      
      generation[i].update();
    }
    
    // Ako svi iz generacije umru
    if(generation.length == 0){

      // Napravi novu generaciju
      generation = NewGenerate(deads);

      // Restartuj score i fitness
      score = 0;
      fitness = 0;

      // Napravi nove zidove
      wall = [new Wall(width,random(height * 0.3, height * 0.7))];

      // Uvecaj gen count
      gen++;

      // Crtaj iz pocetka
      return;
    }
    
    // Pomeri zid
    for(var i = 0; i < wall.length; i++){
      wall[i].update();
    }
    
    // Napravi novi zid ako je poslednji izasao iz kadra
    if(wall[wall.length - 1].x < width * 0.6)
       wall.push(new Wall(width, random(height * 0.3, height * 0.7)));

    // Izbaci iz niza zidova zid koji izadje iz kadra 
    if(wall[0].x < -60){ 
      wall.shift();
      pass = true;
    }
  }
  



  // Crtanje ptica i prepreka
  background(100, 135, 255);
  strokeWeight(1);
  
  for(var i = 0; i < generation.length; i++){
    generation[i].draw();
  }
  
  
  for(var i = 0; i < wall.length; i++){
    wall[i].draw();
  }
  
  // Crtanje trave
  fill(37, 226, 0);
  rect(0, height * 0.85, width - 1, height * 0.15 - 1);
  
  //generation[0].network.display(40,40);

  stroke(0);
  strokeWeight(1);

  // Ispis skora
  fill(0);
  textSize(50);
  text(score, width / 2, 50);

  textSize(15);
  text(record, width / 2 - 30, 20);
  fill(0);

  // Ispis pratecih podataka
  text("Time jump: " + timeJump, 20, height * 0.90);
  text("Time: " + time, 20, height * 0.90 + 20);
  text("lives: " + generation.length, 140, height * 0.90 + 20);
  text("generation: " + gen, 140, height * 0.90);
  
}