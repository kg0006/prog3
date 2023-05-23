let LivingCreature  =   require('./livingcreature.js');

module.exports  = class GrassEater extends LivingCreature{
    constructor(x,y){
        super(x, y);
        this.energy = 3;

    }

    mul () {
        var emptyCells = this.chooseCell(0);
        var newCell = super.random(emptyCells);
 
        if(newCell){
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
 
            var newGrass = new GrassEater(newX, newY);
            grassEater.push(newGrass);
            this.energy = 5
            
            ;
        }
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
        var emptyCells = this.chooseCell(1);
        var newCell = super.random(emptyCells);
        if(newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
            if(this.energy > 10) {
                this.mul()
            }
            for (var i in grasses) {
                if (newX == grasses[i].x && newY == grasses[i].y) {
                    grasses.splice(i, 1);
                    break;
                }
            }
            
        } else {
            this.move()
        }
    }

        die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEater) {
            if (this.x == grassEater[i].x && this.y == grassEater[i].y) {
                grassEater.splice(i, 1);
                break;
            }
        }
    }

}
    


