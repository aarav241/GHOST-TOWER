var gamestate ="play";

var tower,towerimage;
var door,doorimage,doorsGroup;
var climber,climberimage,climberGroup;
var ghost,ghostimage;
var invisibleblock,invisibleGroup;

var p;

function preload(){
  
  towerimage=loadImage("tower.png");
  doorimage = loadImage("door.png");
  climberimage = loadImage("climber.png");
  ghostimage = loadImage ("ghost-standing.png");
  
  soundFormats('wav','ogg')
  Sounds = loadSound('spooky.wav');
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerimage);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,30,30);
  ghost.addImage(ghostimage);
  ghost.scale = 0.5;
  
  doorsGroup = new  Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
} 

function draw(){
  background(0);

  if (gamestate === "play"){
    
  Sounds.play();
    
  if (tower.y>400){ 
    tower.y = 300;
      }

  if (keyDown("space")){
      
    ghost.velocityY = -10;
      
      }
  
  ghost.velocityY = ghost.velocityY + 0.8
  
  if (keyDown("left_arrow")){
      
    ghost.x = ghost.x-3;  
    
      }
  
   if (keyDown("right_arrow")){
      
    ghost.x = ghost.x+3;  
   }
  
  if (climberGroup.isTouching(ghost)){
      
    ghost.velocityY = 0;
      
      }
  
  if (invisibleGroup.isTouching(ghost) || ghost.y > 600){
      
    ghost.destroy();
    
    gamestate = "end";
    
      }
  
  spawndoor();
  
    
  drawSprites();
  }
  
  if (gamestate === "end"){
      
    
    textSize(30)
    stroke("yellow")
    text("gameover", 300,300)  
    
      }
  
  }

function  spawndoor(){
  
  if (frameCount % 240 ===0){
      
    door = createSprite (200,0);
      door.addImage(doorimage);
    
    climber = createSprite (200,65);
    climber.addImage(climberimage);
    
    invisibleblock = createSprite(200,70);
    invisibleblock.width = climber.width;
    invisibleblock.height = 2;
    invisibleblock.velocityY = 1;
    invisibleblock.visible = false;
    
    climber.velocityY = 1;
    door.velocityY = 1;
    
    
    door.x = Math.round(random(150,450));
        door.lifetime = 800;
   climber.x = door.x;
        climber.lifetime = 800; 
   invisibleblock.x = door.x;
    invisibleblock.lifetime = 800;
    
   ghost.depth = door.depth;
    ghost.depth =  ghost.depth+1;
   
    
    doorsGroup.add(door);
    
    climberGroup.add(climber);
    
    invisibleGroup.add(invisibleblock);
      }
  
 

}

