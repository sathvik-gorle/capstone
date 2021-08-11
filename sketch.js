const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerBase, playerArcher;
  var playerArrows = [];
var birds = []
var playerLife = 3
var score = 0

function preload() {
  backgroundImg = loadImage("assets/mXD4mv.png")

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, random(450, height - 300), 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );

}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  fill("black");
  textAlign("center");
  textSize(40);
  text("Bird Hunting Game", width / 2, 100);

  for (var i = 0; i < playerArrows.length; i++) {
    showArrows(i, playerArrows);
  }
  showBirds()

  playerBase.display();
  player.display();
  
  playerArcher.display();


  

  for (var i = 0; i < playerArrows.length; i++) {
    showArrows(i, playerArrows);
    for (var j = 0; j < birds.length; j++) {
      if (playerArrows[i] !== undefined && birds[j] !== undefined) {
        var collision = Matter.SAT.collides(playerArrows[i].body, birds[j].body);
        if (collision.collided) {
            birds[j].remove(j);
            birds.splice(i, 1);

            j--;
            score = score+5
            Matter.World.remove(world, playerArrows[i].body);
            playerArrows.splice(i, 1);
            i--;
          }
          
        }
      }
    }
    player.life()
    if (playerLife <= 0){
      playerArcher.collapse = true;
      Matter.Body.setStatic(playerArcher.body, false)
      Matter.Body.setStatic(player.body, false)
      Matter.Body.setPosition(playerArcher.body, {
        x: width - 100,
        y: player.body.position.y
      })
    }
}

function keyPressed() {
  if (keyCode === 32) {
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle;

    var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

    arrow.trajectory = [];
    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}

function showArrows(index, arrows) {
  arrows[index].display();

}


function showBirds() {
  if (birds.length > 0) {
    if (
      birds.length < 4 &&
      birds[birds.length - 1].body.position.x < width - 300
    ) {
      var positions = [-400, -500, -200, -300];
      var position = random(positions);
      var bird = new Bird(
        width,
        height - 100,
        170,
        170,
        position
      );

      birds.push(bird);
    }

    for (var i = 0; i < birds.length; i++) {
      Matter.Body.setVelocity(birds[i].body, {
        x: -2,
        y: 0
      });

      birds[i].display();
   } 
    }else{
    var bird = new Bird(width, height - 60, 170, 170, -500);
    birds.push(bird);
  }
}
