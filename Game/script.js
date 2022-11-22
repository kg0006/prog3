

var side = 20;
var socket  =   io();

 

function setup() {

    // function matrixGenerator(matrixSize, grassCount, grassEaterCount, hunterCount, predatorCount,livingcreatureCount) {
    //     for (let i = 0; i < matrixSize; i++) {
    //     matrix[i] = []
    //     for (let o = 0; o < matrixSize; o++) {
    //     matrix[i][o] = 0;
    //     }
    //     }
    //     for (let i = 0; i < grassCount; i++) {
    //     let x = Math.floor(random(matrixSize));
    //     let y = Math.floor(random(matrixSize));
    //     matrix[y][x] = 1;
    //     }
    //     for (let i = 0; i < grassEaterCount; i++) {
    //     let x = Math.floor(random(matrixSize));
    //     let y = Math.floor(random(matrixSize));
    //     matrix[y][x] = 2;
    //     }
    //     for (let i = 0; i < hunterCount; i++) {
    //     let x = Math.floor(random(matrixSize));
    //     let y = Math.floor(random(matrixSize));
    //     matrix[y][x] = 3;
    //     }
    //     for (let i = 0; i < predatorCount; i++) {
    //         let x = Math.floor(random(matrixSize));
    //         let y = Math.floor(random(matrixSize));
    //         matrix[y][x] = 4;
    //     }
        
    // }
    //    matrixGenerator(50, 50, 20, 20, 20);


    
   frameRate(10);
   createCanvas(50 * side, 50 * side);
   background('#acacac');
}
socket.on("send massege",draww)

  


function draww(matrix) {
console.log(matrix)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
 
            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("purple");
                rect(x * side, y * side, side, side);
            }
        }
    }
    




    // for (let i in grasses){
    //     grasses[i].mul();
    // }
    // for (let i in grassEater){
    //     grassEater[i].eat();
    // }
    // for (let i in hunterArr){
    //     //console.log(hunterArr)
    //     hunterArr[i].move();
    // }
    // for (let i in predator){
    //     //console.log(predator)
    //     predator[i].eat();
    // }

 }
 
