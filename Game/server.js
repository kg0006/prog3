var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs")

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
zombieArr = [];



let Grass = require('./grass');
let GrassEater = require('./grassEater');
let Predator = require('./predator');
let Hunter = require('./hunter');
let Zombie = require("./zombie")





function createObject() {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

      if (matrix[y][x] == 1) {
        let grassObject = new Grass(x, y);
        grasses.push(grassObject)
      }
      else if (matrix[y][x] == 2) {
        let grassEaterObject = new GrassEater(x, y);
        grassEater.push(grassEaterObject)
      }
      else if (matrix[y][x] == 3) {
        let hunterArrObject = new Hunter(x, y);
        hunterArr.push(hunterArrObject)
      }
      else if (matrix[y][x] == 4) {
        let predatorObject = new Predator(x, y);
        predator.push(predatorObject)
      }
      else if (matrix[y][x] == 5) {
        let zombieObject = new Zombie(x, y);
        zombieArr.push(zombieObject)
      }
    

    }
  }

}





function matrixGenerator(matLength, gr, grEa, dog, hunt, zomb) {
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
      matrix[y][x] = 1;
    }
  }
  for (let i = 0; i < grEa; i++) {
    let x = Math.floor(Math.random() * matLength);
    let y = Math.floor(Math.random() * matLength);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 2;
    }
  }
  for (let i = 0; i < dog; i++) {
    let x = Math.floor(Math.random() * matLength);
    let y = Math.floor(Math.random() * matLength);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 3;
    }
  }

  for (let i = 0; i < hunt; i++) {
    let x = Math.floor(Math.random() * matLength);
    let y = Math.floor(Math.random() * matLength);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 4;
    }
  }
  for (let i = 0; i < zomb; i++) {
    let x = Math.floor(Math.random() * matLength);
    let y = Math.floor(Math.random() * matLength);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 5;
    }
  }
  
  return matrix;
}
matrix = matrixGenerator(50, 50, 20, 20, 40 ,100 );
let x = 2
function setSpeed(data) {
  if (data === "summer") {
    x = 3
  }
  else if (data === "autumn") {
    x = 4
  }
  else if (data === "winter") {
    x = 6
  }
  else if (data === "spring") {
    x = 1
  }
}
function game() {
  //console.log(matrix)
  for (let i in grasses) {
    grasses[i].mul(x);
  }
  for (let i in grassEater) {
    grassEater[i].eat();
  }
  for (let i in hunterArr) {

    hunterArr[i].eat();
  }
  for (let i in predator) {

    predator[i].eat();
  }
  for (let i in hunterArr) {

    hunterArr[i].move();
  }
  for (let i in zombieArr) {

    zombieArr[i].move();
  }
  data = {
    grassCount: grasses.length,
    grassEaterCount: grassEater.length,
    hunterCount: hunterArr.length,
    predatorCount: predator.length,
    zombieCount: zombieArr.length
  }
  
  fs.writeFileSync("data.json", JSON.stringify(data, undefined, 2));

  var text = fs.readFileSync("data.json").toString();

  io.emit("creatures count", JSON.parse(text));
  io.emit("send massege", matrix)
}

createObject();

function killZombie (data){
  console.log(data);
  
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

      if (matrix[y][x] == 5) {
        matrix[y][x] = 0
        for(i in zombieArr){
        zombieArr.splice(i, 1);
        break
        }
      }
    

    }
  }
}



setInterval(game, 500)

io.on('connection', function (socket) {
  socket.on("signal", function (data) {
    setSpeed(data)
  })
  console.log("connected")

  socket.on("kill",killZombie)

});

