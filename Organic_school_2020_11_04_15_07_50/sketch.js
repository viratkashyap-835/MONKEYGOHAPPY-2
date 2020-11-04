var obstacleImg,obstaclesGroup;

var bananaImg,bananasGroup;

var score;

var touch;

var back,backImg;

var ground;

var monkeyImg,monkey;

function preload(){
  obstaclesImg=loadImage("stone.png");
  bananaImg=loadImage("banana.png");
  backImg=loadImage("jungle.jpg");
  monkeyImg=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  
}

function setup(){
  monkey=createSprite(40,280,20,20);
  monkey.addAnimation("Monkey",monkeyImg);
  monkey.scale=0.1;
  score=0;
  touch=0;
  PLAY=1;
  END=0;
  
  gameState=PLAY;
  ground=createSprite(200,320,1000,20);
  ground.visible=false;
  back=createSprite(200,200,1000,400);
  back.x=back.width/2;
  ground.x=ground.width/2;
  back.addImage(backImg);
  obstaclesGroup=new Group();
  bananasGroup=new Group();
}

function draw(){
  background("white");
  
  if(gameState===PLAY){
    text("Score:"+score,50,100);
    ground.velocityX=-(4+3*score/100);
    back.velocityX=-5;
    if(back.x<=0){
      back.x=back.width/2;
    }
    if(ground.x<=0){
      ground.x=ground.width/2;
    }
    console.log(monkey.y);
    if(keyDown("space") && monkey.y>=250){
      monkey.velocityY=-15;
    }
    monkey.collide(ground);
    monkey.velocityY=monkey.velocityY+0.8;
    obstaclesGroup.collide(ground);
    if(bananasGroup.isTouching(monkey)){
      bananasGroup.destroyEach();
      score+=2;
    }
    if(obstaclesGroup.isTouching(monkey)){
      obstaclesGroup.destroyEach();
      touch+=1;
    }
    if(touch===1){
      monkey.scale=0.1;
    }
    else if(touch===2){
      gameState=END;
    }
    if(frameCount%80===0){
      var banana=createSprite(450,randomNumber(120,200),10,20);
      banana.velocityX=-(3+3*score/100);
      banana.addImage(bananaImg);
      banana.lifetime=100;
      banana.scale=0.2;
      bananasGroup.add(banana);
      
    }
    
    if(frameCount%300===0){
      var stone=createSprite(450,280,20,10);
      stone.addImage(obstacleImg);
      stone.lifetime=100;
      stone.velocityX=-(4+3*score/100);
      stone.scale=0.2;
      obstaclesGroup.add(stone);
    }
    
    switch(score)
      {
        case 10:
          monkey.scale=0.12;
          break;
          case 20:
          monkey.scale=0.14;
          break;
          case 30:
          monkey.scale=0.16;
          break;
          case 40:
          monkey.scale=0.18;
          break;
          case 50:
          monkey.scale=0.2;
          break;
          default:
          break;
      }
    
  }
  
  else if(gameState===END){
    obstaclesGroup.destroyEach();
    bananasGroup.destroyEach();
    monkey.destroy();
    ground.velocityX=0;
    obstaclesGroup.setVelocityEach(0);
    bananasGroup.setVelocityEach(0);
    back.visible=false;
    back.velocityX=0;
    
    text("Click on 'R' to restart the game.",150,180);
    if(keyDown("R")){
      gameState=PLAY;
      back.visible=true;
      score=0;
    monkey.scale=0.1;
    }
  }
  drawSprites();
}






