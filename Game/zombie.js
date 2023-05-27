const GrassEater = require('./grassEater.js');
let LivingCreature  =   require('./livingcreature.js');

module.exports  = class Zombie extends LivingCreature{
    constructor(x,y){
        super(x, y);
        this.energy = 400;
    }
    move() {
        let found = this.chooseCell(0);
        let exact = this.random(found)

        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 5
            matrix[this.y][this.x] = 0
            this.x = x;
            this.y = y;

            this.energy--

            if (this.energy < 0) {
                this.die()
            }
        }
         
    }
    eat() {
        this.energy++
        var emptyCells = this.chooseCell(2);
        var newCell = this.random(emptyCells);
        if(newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
            for (var i in hunterArr) {
                if (newX == hunterArr[i].x && newY == hunterArr[i].y) {
                    hunterArr.splice(i, 1);
                    break
                }
            }
            for (var i in predator) {
                if (newX == predator[i].x && newY == predator[i].y) {
                    predator.splice(i, 1);
                    break
                }
            }
            for (var i in zombieArr) {
                if (newX == zombieArr[i].x && newY == zombieArr[i].y) {
                    zombieArr.splice(i, 1);
                    break
                }
            }
        }
        else{
            this.move()
        }
    }
    die() {
        for (let i = 0; i < zombieArr.length; i++) {
            if (zombieArr[i].x == this.x && zombieArr[i].y == this.y) {
                zombieArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }

}