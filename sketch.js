var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var score=0;


function preload(){
  backImage=loadImage("Back.png");
  player_running = loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  

  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  backgr=createSprite(200,400,displayWidth,displayHeight);
  backgr.addImage(backImage);
  backgr.scale=6;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(displayWidth/8,displayHeight-260,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.2;
  
  ground = createSprite(displayWidth,displayHeight-250,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);

      if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
    score = score + 2;
      }
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  player.collide(ground);
    spawnFood();
    spawnObstacles();
    if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.1;
     // score=score-2;
    }
    
    
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
        
  }
    
  camera.position.x = player.x;
  camera.position.y = player.y;
    
    
   
  
    
    
  
    
 

  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("white");
  text("Score: "+ score, displayWidth/8,displayHeight/8);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 300 === 0) {
    var banana = createSprite(displayWidth,displayHeight/4,40,10);
    banana.y = random(displayHeight/2,displayHeight/3);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(displayWidth,displayHeight-250,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    obstacle.depth=10;
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
