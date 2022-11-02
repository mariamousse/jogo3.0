const World = Matter.World;
const Bodies = Matter.Bodies;
const Engine = Matter.Engine;

var player;
var shoot, shootGroup;
var buttonPressed = "space";
var timer = 0;//atirar
var timer2 = 0;//criar inimigos
var timer3 = 0;//subir a munição
var timer4 = 0;//velup
var timer5 = 0;//powerup
var score = 0;
var life = 200;
var vida_png;
var enemieGroup;
var world,engine;
var gameState = "play";
var nivel = 0;
var color;
var time = 0;
var vel_up, vel_up_Group;
var power_up, power_up_Group;
var v = 5;
var power = false;

function preload(){
 vida_png = loadImage("coração.png");
}

function setup() {
 createCanvas(windowWidth,windowHeight);

 engine = Engine.create();
 world = engine.world;

 player = createSprite(200,200,50,50);
 player.shapeColor = "red";

 enemieGroup = new Group();
 shootGroup = new Group();
 vel_up_Group = new Group();
 power_up_Group = new Group();
 color = [random(0,255),random(0,255), random(0,255)];
}

function draw() {
 background(0); 
 Engine.update(engine);
  console.log(timer5 + " " + power);
 if(gameState == "play"){
   timer += 1;
   timer2 += 1;
   timer3 += 1;
   timer4 += 1;
   timer5 += 1;
   time += 1;

   if(timer > 350){
     timer = 350
    }
 
   if(timer3 > 50){
     timer3 = 50
    }
   if(timer4 >= 500){
     timer4 = 0;
     v = 5;
     player.shapeColor = "red";
    }
   if(timer5 >150){
      power = false;
      player.shapeColor = "red";
    }
   //camera.position.y = player.y;

   if(score >= 200){ 
     nivel +=1;
     score = 0;
     color = [random(0,255), random(0,255), random(0,255)];
     life += 50;
    }

   if(keyDown("a")){
     player.x -= v;
     buttonPressed = "a";
    }
   if(keyDown("s")){
     player.y += v;
     buttonPressed = "s";
    }
   if(keyDown("d")){
     player.x += v;
     buttonPressed = "d";
    }
   if(keyDown("w")){
     player.y -= v;
     buttonPressed = "w";
    }

   var shoot1 = timer;
   var shoot2 = timer - 50; 
   var shoot3 = timer - 100; 
   var shoot4 = timer - 150; 
   var shoot5 = timer - 200; 
   var shoot6 = timer - 250;
   var shoot7 = timer - 300;
   if(shoot1 >= 50){
     shoot1 = 50; 
    }
   if(shoot2 > 50){
     shoot2 = 50; 
    }
   if(shoot2 <0){
     shoot2 = 0
    }
   if(shoot3 > 50){
     shoot3 = 50;
    }
   if(shoot3 <0){
     shoot3 = 0
    }
   if(shoot4 > 50){
     shoot4 = 50;
    }
   if(shoot4 <0){
     shoot4 = 0
    }
   if(shoot5 > 50){
     shoot5 = 50;
    }
   if(shoot5 <0){
     shoot5 = 0
    }
   if(shoot6 > 50){
     shoot6 = 50;
    }
   if(shoot6 <0){
     shoot6 = 0
    }
   if(shoot7 > 50){
     shoot7 = 50;
    }
   if(shoot7 <0){
     shoot7 = 0
    }
   // console.log(shoot1 + " " + shoot2 + " " + shoot3 + " "+ shoot4 + " " + shoot5 + " " + shoot6 + " " + shoot7 + " "+ timer);
   if(power == false && keyDown("k") && timer > 50){
     CreateShoot();
     timer -= 25;
    }
   if(power == true && keyDown("k")){
      CreateShoot();
      //timer -= 25;
    }
   if(touches.length && timer > 50){
     CreateShoot();
     timer -= 25;
     touches = [];
    }
   if(nivel < 31 && timer2 > (200 - nivel*5)){
     for(var a=0; a<4; a++){
       var r = Math.round(random(1,4));
       if(r == 1){
         CreateEnemieD();
        }
       if(r == 2){
         CreateEnemieL();
        }
       if(r == 3){
         CreateEnemieR();
        }
       if(r == 4){
         CreateEnemieT();
        } 
      }
     timer2 = 0;
    }
   if(nivel > 30 && timer2 > 50){
    for(var a=0; a<4; a++){
      var r = Math.round(random(1,4));
      if(r == 1){
        CreateEnemieD();
       }
      if(r == 2){
        CreateEnemieL();
       }
      if(r == 3){
        CreateEnemieR();
       }
      if(r == 4){
        CreateEnemieT();
       } 
     }
    timer2 = 0;    
   }
   //console.log("a");
   //timer2 = 0;
  
   if(timer3 >= 50 && keyDown("shift")){
     Dash();
     timer3 = 0;
    }


   shootGroup.overlap(enemieGroup, 
     function(shoot, enemie){
       var roll = Math.round(random(1,100));
       score += 25;
       //console.log(roll);
       if(roll > 3){
         shoot.destroy(); 
         enemie.destroy();
         //enemie.visible = false;
        }
       if(roll < 3){
         Vel(enemie.x, enemie.y,enemie.velocityX, enemie.velocityY);
         enemie.visible = false;  
         //console.log("q");
        }
       if(roll == 3){
        Power(enemie.x, enemie.y, enemie.velocityX, enemie.velocityY);
        enemie.visible = false;

       }
      }
    )
   enemieGroup.overlap(player, 
     function(enemie, player){
       enemie.destroy();
       life -= 50;
      }
    )
   vel_up_Group.overlap(player, 
     function(vel_up, player){
       vel_up.destroy();
       timer4 = 0;
       if(timer4 < 500){
         v = 15;
         player.shapeColor = "blue";
        }
      }
    )
   power_up_Group.overlap(player, 
     function(power_up, player){
       power_up.destroy();
       timer5 = 0;;
       if(timer5 < 150){
         player.shapeColor = "yellow";
         power = true;
        }
      }
    )
  }
 if(life > 200){
   life = 200;
  }

  fill("white");
  textSize(50);
  if(life < 0.2){
   gameState = "end";
   text("FIM DE JOGO", windowWidth/2 - 150, windowHeight/2) 
   player.destroy();
  }
 textSize(20);
 text(Math.round(time/20), 1200, 100);
 //text("lifes: " + life, 100,120);
 text("nivel " + nivel, 110, 160);
 image(vida_png, 50, 70, 50,50);
 rect(100, 80, 200.1, 20);//life1
 rect(100, 120, 200.1, 20);//nivel1
 rect(350, 80, 200.1, 20);//dash1
 rect(350, 115, 20, 25);//shoot1_1
 rect(380, 115, 20, 25);//shoot2_1
 rect(410, 115, 20, 25);//shoot3_1
 rect(440, 115, 20, 25);//shoot4_1
 rect(470, 115, 20, 25);//shoot5_1
 rect(500, 115, 20, 25);//shoot6_1
 rect(530, 115, 20, 25);//shoot7_1
 fill("red");
 rect(100, 80, life + 0.1, 20);//life2
 fill(color);
 rect(100, 120, score + 0.1, 20);//nivel2
 fill(20,200,255);
 rect(350, 80, timer3*4+0.1, 20);//dash2
 fill("gold");
 rect(350, 115, 20, shoot1/2 + 0.1);//shoot1_2
 rect(380, 115, 20, shoot2/2 + 0.1);//shoot2_2
 rect(410, 115, 20, shoot3/2 + 0.1);//shoot3_2
 rect(440, 115, 20, shoot4/2 + 0.1);//shoot4_2
 rect(470, 115, 20, shoot5/2 + 0.1);//shoot5_2
 rect(500, 115, 20, shoot6/2 + 0.1);//shoot6_2
 rect(530, 115, 20, shoot7/2 + 0.1);//shoot7_2
 
 Direction();
 drawSprites();
}
function CreateShoot(){
  shoot = createSprite(player.x, player.y, 50, 20);
  shoot.shapeColor = "gold"
  if(buttonPressed == "a"){
    shoot.velocityX = -20;
  }
  if(buttonPressed == "s"){
    shoot.width = 20;
    shoot.height = 50;
    shoot.velocityY = 20;
  }
  if(buttonPressed == "d"){
    shoot.velocityX = 20;
  }
  if(buttonPressed == "w"){
    shoot.width = 20;
    shoot.height = 50;
    shoot.velocityY = -20;
  }
  shoot.lifetime = 100;
  shootGroup.add(shoot);

  
}
function Dash(){
  if(buttonPressed == "a"){
    player.x += -100;
  }
  if(buttonPressed == "s"){
    player.y += 200;
  }
  if(buttonPressed == "d"){
    player.x += 100;
  }
  if(buttonPressed == "w"){
    player.y += -100;
  }
}
function CreateEnemieR(){
 var enemie = createSprite(windowWidth + 100, random(windowHeight - 100, 100), );
 enemie.shapeColor = [random(0,255), random(0,255), random(0,255)];
 enemie.velocityX = -10 - nivel/5;
 enemie.lifetime = 150;
 enemieGroup.add(enemie);
}
function CreateEnemieL(){
  var enemie = createSprite(-100, random(100, windowHeight -100), );
  enemie.shapeColor = [random(0,255), random(0,255), random(0,255)];
  enemie.velocityX = 10 + nivel/5;
  enemie.lifetime = 150;
  enemieGroup.add(enemie);
}
function CreateEnemieD(){
  var enemie = createSprite(random(windowWidth - 100, 100), windowHeight + 100);
  enemie.shapeColor = [random(0,255), random(0,255), random(0,255)];
  enemie.velocityY = -10 - nivel/5;
  enemie.lifetime = 150;
  enemieGroup.add(enemie);
}
function CreateEnemieT(){
  var enemie = createSprite(random(100, windowWidth -100), -100);
  enemie.shapeColor = [random(0,255), random(0,255), random(0,255)];
  enemie.velocityY = 10 + nivel/5;
  enemie.lifetime = 150;
  enemieGroup.add(enemie);
}
function Direction(){
  
  //fill("")
  if(buttonPressed == "a"){
   rect(player.x - 100, player.y - 10, 20, 20);
  }
  if(buttonPressed == "d"){
   rect(player.x + 50, player.y - 10, 20, 20);
  }
  if(buttonPressed == "w"){
   rect(player.x - 10, player.y - 100, 20, 20);
  }
  if(buttonPressed == "s"){
   rect(player.x - 10, player.y + 50, 20, 20);
  }
}
function Vel(x,y,ax,ay){    
 var vx, vy;
 vel_up = createSprite(x,y, 35, 35); 
 if(ax > 0){
   vx = 5 ;
  }
 if(ax < 0){ 
   vx = -5;
 }
 if(ay > 0){
   vy = 5 ;
  }
 if(ay < 0){ 
   vy = -5;
  }
 if(ax == 0){
    vx = 0 ;
  }
 if(ay == 0){ 
    vy = 0;
  } 
 vel_up.setVelocity(vx,vy);
 vel_up.shapeColor = "lightBlue";
 vel_up_Group.add(vel_up);
 //console.log(vx,vy);
}
function Power(x,y,ax,ay){
  power_up = createSprite(x,y, 35, 35); 
  if(ax > 0){
    vx = 5 ;
   }
  if(ax < 0){ 
    vx = -5;
  }
  if(ay > 0){
    vy = 5 ;
   }
  if(ay < 0){ 
    vy = -5;
   }
  if(ax == 0){
     vx = 0 ;
   }
  if(ay == 0){ 
     vy = 0;
   } 
  power_up.setVelocity(vx,vy);
  power_up.shapeColor = "yellow";
  power_up_Group.add(power_up);
  console.log(vx,vy);
}