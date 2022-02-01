var towerImg, tower;
var ghost, ghostImg;
var doorImg, door, doorsGroup;
var climber, climberImg, climbersGroup;
var invisibleBlock, invisibleBlocksGroup;
var gamestate = "play"


function preload(){
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
 spookySound = loadSound("spooky.wav")
}


function setup(){
 createCanvas(700,700);
 spookySound.loop();
 tower = createSprite(250,250);
 tower.addImage("tower", towerImg);
 tower.velocityY = 1;

 ghost = createSprite(250,250,20,20);
 ghost.addImage("ghost", ghostImg);
 ghost.scale = 0.3;

 doorsGroup = new Group();
 climbersGroup = new Group();
 invisibleBlocksGroup = new Group();

}



function draw(){
  background(0);
  if (gamestate === "play"){
    if (keyDown("space")){
      ghost.velocityY = -14
     }
  
  if(keyDown("right_arrow")){
       ghost.x = ghost.x + 4
     }

  if(keyDown("left_arrow")){
       ghost.x = ghost.x - 4
     }

     
  ghost.velocityY = ghost.velocityY + 0.7;

     if(tower.y > 500){
      tower.y = 400
     }
     SpawnDoors();



    if(climbersGroup.isTouching(ghost)){
       ghost.velocityY = 0
     }
   
     if(invisibleBlocksGroup.isTouching(ghost) || ghost.y > 700){
       ghost.destroy()
       gamestate = "end"
      
     }
    
   drawSprites();
  
  }

  if(gamestate === "end"){
    stroke("green")
    fill("green")
    textSize(40);
    text("Game Over", 230,250);
    
  
  }
}




function SpawnDoors(){
if(frameCount % 240 === 0){
  var door = createSprite(220, - 55);
  var climber = createSprite(200,20);
  var invisibleBlock = createSprite(200,20);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 3;

  door.x = Math.round(random(120,400));
  climber.x = door.x;
  invisibleBlock.x = door.x;

  door.addImage(doorImg);
  climber.addImage(climberImg);

  door.velocityY = 2;
  climber.velocityY = 2;
  invisibleBlock.velocityY = 2;

  door.lifetime = 800;
  climber.lifetime = 800;
  invisibleBlock.lifetime = 800;

  doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleBlocksGroup.add(invisibleBlock);
invisibleBlock.debug = true;
  ghost.depth = door.depth;
  ghost.depth+1


}
}