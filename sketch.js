var bin1,bin2,bin3,ball,ground,launcher,score,binPic,binIMG,ballPic,ballIMG,sling,slingIMG; 

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

function preload(){
  binIMG = loadImage("dustbin.png");
  ballIMG = loadImage("paper.png");
  slingIMG = loadImage("slingshot.png");
}

function setup() {
  createCanvas(1920,800);
  engine = Engine.create();
  world = engine.world;
  
  score = 0;

  bin1 = new Bin(1775,740,20,220);
  bin2 = new Bin(1720,790,130,20);
  bin3 = new Bin(1665,740,20,220);
  ball = new Ball(200,620,50,50);
  ground = new Ground(960,800,1920,10);
  launcher = new Launcher(ball.body,{x:200,y:600});
  
  sling = createSprite(ball.body.position.x,680);
  sling.addImage("sling",slingIMG);
  sling.scale = 0.5;
  
  ballPic = createSprite(ball.body.position.x,ball.body.position.y);
  ballPic.addImage("ball",ballIMG);
  ballPic.scale = 0.5;

  binPic = createSprite(bin2.body.position.x,720);
  binPic.addImage("bin",binIMG);
  binPic.scale = 0.5;
}

function draw() {
  background(255);
  Engine.update(engine);

  drawSprites();

  ground.display();
  launcher.display();

  ballPic.x = ball.body.position.x;
  ballPic.y = ball.body.position.y;

  if(keyDown("enter")){
    ball.body.position.x = 200;
    ball.body.position.y = 620;
    launcher.attach(ball.body);
  }

  if(keyDown(UP_ARROW)){
    ball.body.position.y -= 1;
  }
  if(keyDown(DOWN_ARROW)){
    ball.body.position.y += 1;
  }
  if(keyDown(RIGHT_ARROW)){
    ball.body.position.x += 1;
  }
  if(keyDown(LEFT_ARROW)){
    ball.body.position.x -= 1;
  }

  if(ball.body.position.x > bin3.body.position.x && ball.body.position.x < bin1.body.position.x && ball.body.position.y > bin1.body.position.y && ball.body.position.y < bin2.body.position.y){
    score ++;
    ball.body.position.x = 200;
    ball.body.position.y = 620;
    launcher.attach(ball.body);
  }

  fill(0,255,255);
  strokeWeight(2);
  stroke(255,0,255);
  textSize(40);
  text("Click Enter Key to Reset the Ball",620,100);
  text("Click Arrow Keys for Small Boosts",610,150);
  textSize(80);
  text(score,900,400);
}

function mouseDragged(){
  Matter.Body.setPosition(ball.body,{x:mouseX,y:mouseY});
}

function mouseReleased(){
  launcher.fly();
}