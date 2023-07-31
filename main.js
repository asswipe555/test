const GAME_FPS = 1000/60;
const SCREEN_SIZE_W = 256;
const SCREEN_SIZE_H = 224;

let vcan = document.createElement("canvas")
let vcon = vcan.getContext("2d")


let can = document.getElementById("can");
let con = can.getContext("2d");


vcan.width = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;

can.width = SCREEN_SIZE_W*3;
can.height = SCREEN_SIZE_H*3;

con.mozimageSmoothingEnabled = false;
con.msimageSmoothingEnabled = false;
con.webikitimageSmoothingEnabled = false;
con.imageSmoothingEnabled = false;


let frameCount =0;
let startTime;


let chImg = new Image() ;
chImg.src = "sp3.png";
// chImg.onload =  draw();

let keyb={};

let venomu_x = 100<<4;
let venomu_y = 150<<4;
let venomu_vx = 0; 
let venomu_anime =0;
let venomu_dir=0;
let venomu_sprite =0;
let venomu_acount =0;


function update(){
      
   if( keyb.Left ){
    if(venomu_anime==0)venomu_acount=0;
    venomu_anime= 1;
    venomu_dir=1;
    if(venomu_vx>-32)venomu_vx-=1;
    if(venomu_vx>0)venomu_vx-=1;
   }
    else if( keyb.Right ){
        if(venomu_anime==0)venomu_acount=0;
        venomu_anime=1;
        venomu_dir=0;
     if(venomu_vx<32)venomu_vx+=1;
     if(venomu_vx<0)venomu_vx+=1;
    }else{
      if(venomu_vx>0)venomu_vx-=1;
      if(venomu_vx<0)venomu_vx+=1;
      if(!venomu_vx)venomu_anime=0;
     }
     
    venomu_dir=0;
    venomu_acount++;
    if(Math.abs(venomu_vx)==32)venomu_acount++;
    
    if(venomu_anime ==0)venomu_sprite=0;
    else if(venomu_anime ==1)venomu_sprite=1 + ((venomu_acount>>3)%9);
    
    if(venomu_dir)venomu_sprite =9 - ((venomu_acount>>3)%10);


   venomu_x += venomu_vx;
};


function drawSprite(snum,x,y){

    //sum%10//
 let sx = (snum%10)*320
 let sy = Math.floor(snum/10)*320

 vcon.drawImage(chImg,sx,sy,320,320, x,y,80,80);
};

// Canvasを反転させる関数
// function flipCanvas() {
//     const vcan = document.getElementById('canvas');
//     const vcon = vcan.getContext('2d');
    // vcon.scale(-1, 1); //X軸を反転させる
    // 反転した画像を描画する前に座標を調整
    // const vcanWidth = vcan.width;
    // vcon.translate(-vcanWidth, 0);
    // 画像を再描画する
//      drawSprite();
//   }



function draw() {

vcon.fillStyle="#66AAFF";
vcon.fillRect(0,0,SCREEN_SIZE_W,SCREEN_SIZE_H);

drawSprite(venomu_sprite, venomu_x>>4, venomu_y>>4 )

vcon.font="22px'Impact'";
vcon.fillStyle="red";
vcon.fillText("フレーム数:"+frameCount,0,20);

con.drawImage(vcan,0,0,SCREEN_SIZE_W,SCREEN_SIZE_H, 0,0,SCREEN_SIZE_W*3,SCREEN_SIZE_H*3);

};




// setInterval(mainLoop,1000/60);

window.onload = function(){
    
    startTime = performance.now();
    mainLoop();

};

function mainLoop(){

       let nowTime  = performance.now();
       let nowFrame = (nowTime-startTime) / GAME_FPS ;
        
       if(nowFrame > frameCount){
          
          let c=0;
          while(nowFrame > frameCount){
          
          frameCount++;  
       
          update();
          if( ++c>=4)break;
          
          };
 
          draw();

       };

       requestAnimationFrame(mainLoop);
};



document.onkeydown = function(e){
    
    if(e.keyCode == 65)keyb.Left=true;
    if(e.keyCode == 68)keyb.Right=true;

}

document.onkeyup = function(e){
    
    if(e.keyCode == 65)keyb.Left  = false;
    if(e.keyCode == 68)keyb.Right = false;

}