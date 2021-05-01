var PLAY = 1 ;
var END = 0 ;
var gameState = PLAY ;
var hero ;
var heroAni ;
var ground ;
var score ;
var zombie ;
var zombieImg ;
var zombiesGroup ;
var bullet;



function preload() {
  heroAni = loadImage("iron man.png")
  zombieImg = loadImage("zombie.jpg") ;
}

function setup() {
  createCanvas(400,400);
  
  hero = createSprite(50,350,20,20) ;
  hero.addImage(heroAni);
  hero.scale = 0.3

 
  
  ground = createSprite(200,390,400,20);
  ground.depth = -10 ;
  
  zombiesGroup = new Group();
  bulletsGroup = new Group();

  score = 0 ;
}

function draw() {
  background(0) ;
  
  stroke("white")
  fill("white");
  textSize(30)
  text("Kill The Zombie", 100,50);


  
  
  
 if(gameState === PLAY){
   
   if(keyDown("space")) {
    
    spawnBullets();
   }
  
   
 if(zombiesGroup.isTouching(bulletsGroup)){
    zombiesGroup.destroyEach();
    bulletsGroup.destroyEach();
  }
   
   spawnZombie() ;
  
   if(zombiesGroup.isTouching(hero)) {
     gameState = END ;
   }
   
 }
   else if (gameState === END) {
     ground.velocityX = 0 ;
     hero.velocityY = 0 ;
     
     
     textSize(20)
     text("GAME OVER" , 150,150 ) ;
     textSize()
     text("Press R To Restart" , 130,200)
     
     
     zombiesGroup.setLifetimeEach(-1);
     zombiesGroup.setVelocityXEach(0);
     
    
    
 }
  
  if(keyDown("r")) {
   restart() ;
  }

  hero.collide(ground) ;
  
drawSprites() ; 
}

function spawnZombie() {
  if (frameCount % 100 === 0){
   var zombie = createSprite(350,350,10,40);
    var rand = Math.round(random(80,120));
    zombie.addImage(zombieImg) ;
    zombie.velocityX = -6 ;   
    zombie.scale = 0.15 ;
    zombie.lifetime = 100 ;
    zombie.depth = 10 ;
    zombie.setCollider("circle" , 0,0,150 ) ;
  
    
    
    zombiesGroup.add(zombie);
  }
  
}

function restart() {
    gameState = PLAY ;
    score = 0 ;
    zombiesGroup.destroyEach() ;
}

function spawnBullets() {
   var bullet = createSprite(50,350,10,10);
    var rand = Math.round(random(80,120));
    bullet.velocityX = 6 ;  
    bullet.lifetime = 100 ;
    bullet.depth = 10 ;
  
    
    
    bulletsGroup.add(bullet);
  
}
