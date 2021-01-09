var body = document.body;
var cells = document.getElementById('cells');
var row = document.getElementById('row');
var table = document.createElement('table');
var cells = [];
var rows = [];
var turn = 'X';
// var tds = document.getElementsByTagName("td");
// var trs = document.getElementsByTagName("tr");
var result = document.createElement('div');
var cell = document.createElement('td');
var gameOver = false;

var callback = function(e){

  var rowcount = rows.indexOf(e.target.parentNode);
  var cellcount = cells[rowcount].indexOf(e.target);

  if (cells[rowcount][cellcount].textContent !== ''){
  }else{

    cells[rowcount][cellcount].textContent = turn;
    var full = false;
    var full = false;

    if (
      cells[rowcount][0].textContent === turn &&
      cells[rowcount][1].textContent === turn &&
      cells[rowcount][2].textContent === turn
    ) {
      full = true;
    }

    if (
      cells[cellcount][0].textContent === turn &&
      cells[cellcount][1].textContent === turn &&
      cells[cellcount][2].textContent === turn
    ) {
      full = true;
    }

    if ( rowcount - cellcount === 0) {
      if(
      cells[0][0].textContent === turn &&
      cells[1][1].textContent === turn &&
      cells[2][2].textContent === turn
    ) {
      full = true;
      }
    }
    if (Math.abs(rowcount - cellcount) === 2){
      if(
      cells[0][2].textContent === turn &&
      cells[1][1].textContent === turn &&
      cells[2][0].textContent === turn
    ) {
      full = true;
    }
  }
    if(full){
      result.textContent = turn + 'VICTORY!';
      turn = 'X';
      cells.forEach(function(row) {
        row.forEach(function(cell) {
          cell.textContent= '';
      });
      });
      gameOver = true;
      close(gameOver);
    } else{
    if(turn === 'X'){
      turn = 'O';
      cells[rowcount][cellcount].className = 'o';
    }else {
      turn = 'X';
      cells[rowcount][cellcount].className = 'x';
    }

  }
}
};

for (var i = 1; i <= 3; i += 1) {
  var row = document.createElement('tr');
  rows.push(row);
  cells.push([]);
  for (var j = 1; j <= 3; j += 1) {
    var cell = document.createElement('td');
    cell.addEventListener('click', callback);
    cells[i - 1].push(cell);
    row.appendChild(cell);
  }
  table.appendChild(row);
}
body.appendChild(table);

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function takeTurns(cell, turn) {
  if (turn === 'X') {
    cell.className = "x";
  }
  if (turn === 'O') {
    cell.className = "o";
  }
}


function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');

        });
    });
}

function close(gameOver) {
  let overlays = Array.from(document.getElementsByClassName('gameover-text'));
  overlays.forEach(overlay => {
      overlay.addEventListener('click', () => {
          overlay.classList.remove('visible');
      });
      if (gameOver === true) {
          overlay.classList.add('visible');
      }
});


}
