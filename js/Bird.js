class Bird {
    constructor(x, y, width, height, birdPos) {
      var options = {
        restitution: 0.8,
        friction: 1.0,
        density: 1.0,
        label: "bird"
      };
      this.speed = 3;
      this.body = Bodies.rectangle(x, y, width, height, options);
      this.width = width;
      this.height = height;
      this.image = loadImage("./assets/1435464086.png");

  
      this.birdPosition = birdPos;
      this.isBroken = false;
  
      World.add(world, this.body);
    }
  
    
    remove(index) {
      this.isBroken = true;
      Matter.World.remove(world, birds[index].body);
      birds.splice(index, 1);
    }
    
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image, 0, this.birdPosition, this.width, this.height);
      noTint();
      pop();
    }
  }
  