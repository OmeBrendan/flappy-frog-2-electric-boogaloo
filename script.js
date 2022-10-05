let pillars = [];
let activeFrogs = [];
let allFrogs = [];
var smartestFrog;
var gameState = 1;
var score = 0;
var highscore = 0;
var totalPopulation = 500;
var generation = 1;

function preload() {
  bg = loadImage('pictures/landscape.png');
  fr = loadImage('pictures/tim.jpg')
  ps = loadImage('pictures/paddenstoel.png')
  jump = loadSound('audio/jump.mp3');
  oswald = loadFont('font/oswald.ttf');
  pepe = loadImage('pictures/pepe2.png')
  go = loadImage('pictures/gameover.png')
}

function setup() {
  createCanvas(550, 400);
  //frog = new Frog(-0.5, 150, 0.25);
  newFrogs();
  background(bg);

  let randomHeight = random(height - 150);  
}


function draw() {
  if (gameState == 0) {
    background(bg);
    image(ps, 50, -25, 450, 450);

    strokeWeight(8);
    fill(255);
    rect(-10, 265, 600, 70);
    stroke(0);

    strokeWeight(1);
    fill(0);
    textSize(30);
    textFont(oswald);
    text("Press enter to play", 175, 310);
  } else if (gameState == 1) {
    clear();
    background(bg);


    if (frameCount % 80 == 0) {
      let randomHeight = random(height - 150);
      pillars.push(new Pillar(550, 0, randomHeight));
      pillars.push(new Pillar(550, randomHeight + 150, 1000));
    }  
    
    activeFrogs.forEach(frog => {
      frog.draw();
      frog.think(pillars);      
    })

    pillars.forEach(p => p.drawPillar());
    
    pillars.forEach(p => {
      activeFrogs.forEach(frog => {
        p.hit(frog);
      })
    });

      // one left? Then this is the smartest bird
  if(activeFrogs.length == 1){
    smartestFrog = activeFrogs[0];
  }

  // If we're out of birds go to the next generation
  if (activeFrogs.length == 0) {
    reset();
  }
}

  text('generation: ' + generation, 10, 20);
  text('score: ' + score, 10, 30);
  text('highscore: ' + highscore, 10, 40);
  text('living tims: ' + activeFrogs.length, 10, 50);

    if (pillars.length > 5 && frameCount % 60 == 20) {
      score++;
    }

    else if (gameState == 2) {
    gameOver();
    text(score, 30, 50);
    textSize(30);
  }
}


function gameOver() {
  clear();
  if (score > highscore) {
    highscore = score;
  }
  background(bg);
  image(pepe, 170, 60);
  image(go, 170, 8)

  strokeWeight(8);
  fill(255);
  rect(-10, 315, 600, 75);

  fill(255);
  strokeWeight(2);
  stroke(0);
  textSize(24);
  text("score:          " + score, 190, 340);
  text("highscore:   " + highscore, 190, 365);

  textSize(15);
  textFont(oswald);
  strokeWeight(1.5);
  text("press enter to play again", 190, 380);
}

function reset() {
  score = 0;
  pillars = [];
  gameState = 1;
  newFrogs();
  generation ++;
  if (score > highscore) {
    highscore = score
  }
}

function newFrogs() {
  
  for (let i = 0; i < totalPopulation; i++) {    
    let frog
    if(smartestFrog){
      frog = new Frog(smartestFrog.brain);
    }
    else{
      frog = new Frog();
    }
    activeFrogs[i] = frog;
    allFrogs[i] = frog;
  }  
} 