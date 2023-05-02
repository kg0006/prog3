var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static("."));
app.get('/', function (req, res) {
  res.redirect('index.html');
});
server.listen(3000);

matrix = [];
grasses = [];
grassEater = [];
hunterArr = [];
predator = [];
livingcreature = [];


LivingCreature = require('./livingcreature');
Grass = require('./grass');
GrassEater = require('./grassEater');
Predator = require('./predator');
Hunter = require('./hunter');
Predator = require('./predator');





function createObject() {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

      if (matrix[y][x] == 1) {
        let grassObject = new Grass(x, y);
        grasses.push(grassObject)
      }
      if (matrix[y][x] == 2) {
        let grassEaterObject = new GrassEater(x, y);
        grassEater.push(grassEaterObject)
      }
      if (matrix[y][x] == 3) {
        let hunterArrObject = new Hunter(x, y);
        hunterArr.push(hunterArrObject)
      }
      if (matrix[y][x] == 4) {
        let predatorObject = new Predator(x, y);
        predator.push(predatorObject)
      }
      if (matrix[y][x] == 5) {
        let livingcreatureObject = new LivingCreature(x, y);
        livingcreature.push(livingcreatureObject)
      }

    }
  }
}





function matrixGenerator(matLength, gr, grEa, dog, hunt) {
  let matrix = [];

  for (let i = 0; i < matLength; i++) {
    matrix.push([])
    for (let j = 0; j < matLength; j++) {
      matrix[i].push(0)
    }
  }
  for (let i = 0; i < gr; i++) {
    let x = Math.floor(Math.random() * matLength);
    let y = Math.floor(Math.random() * matLength);
    if (matrix[y][x] == 0) {
      matrix[x][y] = 1;
    }
  }
  for (let i = 0; i < grEa; i++) {
    let x = Math.floor(Math.random() * matLength);
    let y = Math.floor(Math.random() * matLength);
    if (matrix[y][x] == 0) {
      matrix[x][y] = 2;
    }
  }
  for (let i = 0; i < dog; i++) {
    let x = Math.floor(Math.random() * matLength);
    let y = Math.floor(Math.random() * matLength);
    if (matrix[y][x] == 0) {
      matrix[x][y] = 3;
    }
  }

  for (let i = 0; i < hunt; i++) {
    let x = Math.floor(Math.random() * matLength);
    let y = Math.floor(Math.random() * matLength);
    if (matrix[y][x] == 0) {
      matrix[x][y] = 4;
    }
  }

  return matrix;
}
matrix = matrixGenerator(50, 50, 20, 20, 20);


function game() {
  //console.log(matrix)
  for (let i in grasses) {
    grasses[i].mul();
  }
  for (let i in grassEater) {
    grassEater[i].eat();
  }
  for (let i in hunterArr) {

    hunterArr[i].move();
  }
  for (let i in predator) {

    predator[i].eat();
  }
  io.sockets.emit("send massege", matrix)
}

setInterval(game, 500)

io.on('connection', function (socket) {
  console.log("connected")
  createObject();

});

