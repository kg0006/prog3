class GrassEater extends LivingCreature{
    constructor(x,y){
        super(x, y);
        this.x = x;
        this.y = y;
        this.energy = 3;
        this.directions = [];
    }

    mul () {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
 
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

    

    eat() {
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        if(newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
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

    

}
    


