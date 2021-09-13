var Fighter,FighterImage
var backGround
var Meteor,MeteorImage
var Laser
var score = 0
var count = 0
var a = 125
var b = 80
var c = 50
var d = 40
var e = 35
var level = 1
var gamestate = "start"

function preload(){
  FighterImage = loadImage("images/SpaceFighter.png")
  backGround = loadImage("images/Space.jpg")
  MeteorImage = loadImage("images/Meteor.png")
}

function setup() {

  createCanvas(1200,650);

  Fighter = createSprite(600,550)
  Fighter.addImage(FighterImage)
  Fighter.scale = 0.12

  MeteorGroup = new Group()
  LaserGroup = new Group()
}

function draw() {
  background(backGround); 

  if(gamestate === "start"){
    textSize(20)
    fill("white")
    text("You are a Space Fighter Defending Earth from Meteors.",300,200)
    text("Use arrow keys to move and space key to shoot lasers.",300,250)
    text("If the Meteor leaves your sight, Earth will be destroyed.",300,300)
    text("Your lasers have a cooldown before shooting again.",300,350)
    text("Press Space to begin",300,400)
    text("Good Luck.",600,400)

    if(keyDown("space")){
      gamestate = "play"
    }
  }
  
  if(gamestate === "play"){
    textSize(18)
    fill("white")
    text("Score: "+score,1050,50)
    text("Level "+level,1050,75)
    Fighter.velocityX = 0
    Fighter.velocityY = 0

    Meteors()
  
    if(keyDown(RIGHT_ARROW)){
      Fighter.velocityX = 7
    }

    if(keyDown(LEFT_ARROW)){
      Fighter.velocityX = -7
    }

    if(keyWentDown("space") && count === 0 ){
      Laser = createSprite(Fighter.x,540,5,17)
      Laser.velocityY = -5
      Laser.lifetime = 200
      Laser.shapeColor = "red"
      LaserGroup.add(Laser)
      count = 1  
    }
    for(var i = 0;i < MeteorGroup.length;i++){
      if(MeteorGroup[i].isTouching(LaserGroup)){
        MeteorGroup[i].destroy()
        score = score+50
      }
      if(MeteorGroup[i]!=undefined){ 
        if(Fighter.isTouching(MeteorGroup[i])){
          MeteorGroup[i].destroy()
          score = score-100
        }
      }
      if(MeteorGroup[i]!=undefined){   
        if(MeteorGroup[i].y>650){
          gamestate = "end"
        }
      } 
    }

    if(Laser!=undefined){
      if(Laser.lifetime<175){
        count = 0
      }
    }

    if(score<0){
      gamestate = "end"
    }
    

    Fighter.display() 
    drawSprites();
  }
  if(gamestate === "end"){
    MeteorGroup.destroyEach()
    LaserGroup.destroyEach()
    if(score<0){
      score = 0
    }
    textSize(70)
    fill("white")
    text("Game Over",400,300)
    textSize(30)
    text("Score: "+score,1000,50)
    text("Press R to try again",450,350)
    if(keyDown("r")){
      Reset()
    }
  }
}

function Meteors(){
  if(score<=150){
    if(frameCount%a === 0){
      var rand = Math.round(random(300,900))
      Meteor = createSprite(rand,-50)
      Meteor.addImage(MeteorImage)
      Meteor.velocityY = 4
      Meteor.scale = 0.07
      Meteor.lifetime = 200
      MeteorGroup.add(Meteor)
      level = 1
    } 
  }
  else if(score>150 && score<=500){
    if(frameCount%b === 0){
      var rand = Math.round(random(300,900))
      Meteor = createSprite(rand,-50)
      Meteor.addImage(MeteorImage)
      Meteor.velocityY = 4
      Meteor.scale = 0.07
      Meteor.lifetime = 200
      MeteorGroup.add(Meteor)
      level = 2
    }
  }
  else if(score>500 && score<=1000){
    if(frameCount%c === 0){
      var rand = Math.round(random(300,900))
      Meteor = createSprite(rand,-50)
      Meteor.addImage(MeteorImage)
      Meteor.velocityY = 4
      Meteor.scale = 0.07
      Meteor.lifetime = 200
      MeteorGroup.add(Meteor)
      level = 3
    }
  }
  else if(score>1000 && score<=2500){
    if(frameCount%d === 0){
      var rand = Math.round(random(300,900))
      Meteor = createSprite(rand,-50)
      Meteor.addImage(MeteorImage)
      Meteor.velocityY = 4
      Meteor.scale = 0.07
      Meteor.lifetime = 200
      MeteorGroup.add(Meteor)
      level = 4
    }
  }
  else if(score>2500){
    if(frameCount%e === 0){
      var rand = Math.round(random(300,900))
      Meteor = createSprite(rand,-50)
      Meteor.addImage(MeteorImage)
      Meteor.velocityY = 4
      Meteor.scale = 0.07
      Meteor.lifetime = 200
      MeteorGroup.add(Meteor)
      level = 5
    }
  }
}

function Reset(){
  gamestate = "play"
  score = 0
  level = 1
  MeteorGroup.destroyEach()
  Fighter.x = 600
}
