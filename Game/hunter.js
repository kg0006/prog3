let LivingCreature  =   require('./livingcreature.js');

module.exports  = class Hunter extends LivingCreature{
    constructor(x,y){
        super(x, y);
        this.energy = 200;
    }
    move() {
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }

    eat() {
        this.energy++
        var emptyCells = this.chooseCell(2);
        var newCell = this.random(emptyCells);
        if(newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
            for (var i in grassEater) {
                if (newX == grassEater[i].x && newY == grassEater[i].y) {
                    grassEater.splice(i, 1);
                    break
                }
            }
        }
        else{
            this.move()
        }
    }
    die() {
        for (let i = 0; i < hunterArr.length; i++) {
            if (hunterArr[i].x == this.x && hunterArr[i].y == this.y) {
                hunterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }

}