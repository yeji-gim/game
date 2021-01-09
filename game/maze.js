var canvas = document.getElementById('maze');
var context = canvas.getContext('2d');
var gameOver = false;

var map = [[0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
           [0,1,1,1,0,1,0,0,0,0,1,1,1,0,0,0,1,1,0,0],
           [0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0],
           [0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,0,0,0,0,0],
           [0,1,0,0,1,1,0,1,0,0,0,0,0,1,1,1,0,0,0,1],
           [0,0,1,1,1,1,0,1,1,0,1,1,0,0,0,0,0,0,0,1],
           [1,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0],
           [1,0,0,1,1,1,0,0,1,1,0,1,1,1,0,0,0,1,1,0],
           [1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,2]];

var collBox = [];
var mapLength = map[0].length;
var mapHeight = map.length;
var brick = new Image();
brick.src="https://img.icons8.com/emoji/96/000000/-emoji-christmas-tree.png"

var santa = new Image();
santa.src = "https://img.icons8.com/emoji/96/000000/santa-claus-emoji.png"

var gift = new Image();
gift.src = "https://img.icons8.com/plasticine/100/000000/christmas-gift.png"

var gol = new Image();
gol.src="https://img.icons8.com/plasticine/100/000000/long-arrow-down.png"
context.imageSmoothingEnabled = false;

var field = new Image();
field.src="https://img.icons8.com/offices/80/000000/dust.png"
function drawMap(m){
  for(i=0; i<m.length; i++){
    collBox.push([]);
    for(j=0; j<m[i].length; j++){
      if(map[i][j]=== 1){
          context.beginPath();
          // context.fillStyle = 'red';
          context.imageSmoothingEnabled = false;
          context.drawImage(brick, 0, 0, 100, 100, j*15, i*15, 15 ,15);

      }
      else if (m[i][j] === 2) {
        context.beginPath();
        context.imageSmoothingEnabled = false;
        context.drawImage(gift, 0, 0, 100, 100, j*15, i*15, 15 ,15);

      }

      collBox[i].push({x: j*15, y: i*15, status: m[i][j] === 1 ? 1 : (m[i][j] === 2 ? 2 : 0)});
    }
  }
}

function drawPlayer(x,y){
  context.beginPath();
  context.imageSmoothingEnabled = false;
  context.drawImage(santa, 0, 0, 100, 100, x, y, 15 ,15);


}

function move(x,y){

  context.clearRect(0,0,mapLength*15,mapHeight*15);
  drawPlayer(x,y);
  drawMap(map);
  player.x = player.newX;
  player.y = player.newY;

}

let player = {
    x:0,
    y:0,
    newX:0,
    newY:0
  }

function checkColl(){
  for(i=0; i<mapHeight; i++){
    for(j=0; j<mapLength; j++){
      var b = collBox[i][j];

      if(player.newX === b.x && player.newY === b.y){
        if(b.status === 1){
          // console.log('Hit Rock');
        }
        else if(b.status === 2){
          move(player.newX, player.newY);
          gameOver = true;
          close(gameOver);

        }
        else{
          move(player.newX, player.newY);
        }
      }
      else if(player.newX < 0 || player.newX >= mapLength*15 || player.newY < 0 || player.newY >= mapHeight*15){
        // console.log('Hit wall');
      }
    }
  }
}

window.onkeydown = function(e){
  if(e.keyCode === 37){
    player.newX = player.x - 15; player.newY = player.y ;
    }
  if(e.keyCode === 38){
    player.newY = player.y - 15; player.newX = player.x ;
    }
  if(e.keyCode === 39){
    player.newX = player.x + 15; player.newY = player.y ;
    }
  if(e.keyCode === 40){
    player.newY = player.y + 15; player.newX = player.x ;
    }

  checkColl();
}


function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');

        });
    });
}

function reset(){
  // drawMap(map);
  // drawPlayer(0,0);
  move(0,0);
  player.x = 0;
  player.y = 0;
}

function close() {
  let overlays = Array.from(document.getElementsByClassName('gameover-text'));
  overlays.forEach(overlay => {
      overlay.addEventListener('click', () => {
          overlay.classList.remove('visible');
          console.log('pink');
          reset();
      });
      if (gameOver === true) {
          overlay.classList.add('visible');

      }

});

}
window.onload = function(){
  drawMap(map);
  drawPlayer(0,0);
}

ready();
