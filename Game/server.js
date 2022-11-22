var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static("."));
app.get('/', function (req, res) {
res.redirect('index.html');
});
server.listen(3000);

var matrix = [];
var grasses = [];
var grassEater = [];
var hunterArr = [];
var predator = [];
var livingcreature = [];


const LivingCreature = require('./livingcreature');
const Grass = require('./grass');
const GrassEater = require('./grassEater');
// const Predator = require('./predator');
const Hunter = require('./hunter');
const Predator = require('./predator');





function createObject(){
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
          let grassObject = new Grass(x,y);
          grasses.push(grassObject)
        }
        if (matrix[y][x] == 2) {
            let grassEaterObject = new GrassEater(x,y);
            grassEater.push(grassEaterObject)
          }
          if (matrix[y][x] == 3) {
            let hunterArrObject = new Hunter(x,y);
            hunterArr.push(hunterArrObject)
          }
          if (matrix[y][x] == 4) {
            let predatorObject = new Predator(x,y);
            predator.push(predatorObject)
          }
          if (matrix[y][x] == 5) {
            let livingcreatureObject = new LivingCreature(x,y);
            livingcreature.push(livingcreatureObject)
          }
      
    }
}
}



io.on('connection', function (socket) {
console.log("connected")
createObject();
  
  });


let Random = Math.floor(Math.random() * 50);

function matrixGenerator(matrixSize, grassCount, grassEaterCount, hunterCount, predatorCount,livingcreatureCount) {
  for (let i = 0; i < matrixSize; i++) {
  matrix[i] = []
  for (let o = 0; o < matrixSize; o++) {
  matrix[i][o] = 0;
  }
  }
  for (let i = 0; i < grassCount; i++) {
  let x = Random;
  let y = Random;
  matrix[y][x] = 1;
  }
  for (let i = 0; i < grassEaterCount; i++) {
  let x = Random;
  let y = Random;
  matrix[y][x] = 2;
  }
  for (let i = 0; i < hunterCount; i++) {
  let x = Random;
  let y = Random;
  matrix[y][x] = 3;
  }
  for (let i = 0; i < predatorCount; i++) {
      let x = Random;
      let y = Random;
      matrix[y][x] = 4;
  
  }
  // for (let i = 0; i < livingcreatureCount; i++) {
  //     let x = Random;
  //     let y = Random;
  //     matrix[y][x] = 5;
  
  // }
}
  matrixGenerator(50, 50, 20, 20, 20);
  io.sockets.emit("send massege", matrix)

 function game() {
for (let i in grasses){
  grasses[i].mul();
}
for (let i in grassEater){
  grassEater[i].eat();
}
for (let i in hunterArr){
  
  hunterArr[i].move();
}
for (let i in predator){
 
  predator[i].eat();
}
io.sockets.emit("send massege", matrix)
 }

 setInterval( game , 1000)
  
